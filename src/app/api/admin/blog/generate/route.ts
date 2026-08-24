import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { requireAdminUser } from '@/lib/auth'

export const dynamic = 'force-dynamic'

const ORG = 'oxiverse-ecosystem'
const GITHUB_API = 'https://api.github.com'

function slugify(str: string) {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

function formatDate(d: Date) {
  return d.toISOString().slice(0, 10)
}

async function ghFetch(url: string) {
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'oxiverse-cms',
  }
  const token = process.env.GITHUB_TOKEN
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(url, { headers, next: { revalidate: 0 } })
  if (!res.ok) return null
  return res.json()
}

interface ParsedCommit {
  headline: string
  body: string[]
  author: string
  date: string
  sha: string
  htmlUrl: string
  type: 'feat' | 'fix' | 'refactor' | 'docs' | 'perf' | 'chore' | 'other'
}

function parseCommitMessage(message: string): { headline: string; body: string[]; type: ParsedCommit['type'] } {
  const rawLines = message.split(/\r?\n/).map(l => l.trim()).filter(Boolean)
  if (rawLines.length === 0) {
    return { headline: 'System update', body: [], type: 'other' }
  }

  const headline = rawLines[0]
  const body = rawLines.slice(1).filter(l => !l.startsWith('Co-authored-by:') && !l.startsWith('Signed-off-by:'))

  let type: ParsedCommit['type'] = 'other'
  const lowerHeadline = headline.toLowerCase()
  if (/^feat(\(.*\))?:/.test(lowerHeadline) || lowerHeadline.startsWith('add ') || lowerHeadline.startsWith('implement ')) {
    type = 'feat'
  } else if (/^fix(\(.*\))?:/.test(lowerHeadline) || lowerHeadline.startsWith('fix ') || lowerHeadline.startsWith('resolve ')) {
    type = 'fix'
  } else if (/^refactor(\(.*\))?:/.test(lowerHeadline) || lowerHeadline.startsWith('refactor ') || lowerHeadline.startsWith('clean ')) {
    type = 'refactor'
  } else if (/^docs(\(.*\))?:/.test(lowerHeadline) || lowerHeadline.startsWith('docs ') || lowerHeadline.startsWith('document ')) {
    type = 'docs'
  } else if (/^perf(\(.*\))?:/.test(lowerHeadline) || lowerHeadline.startsWith('optimize ')) {
    type = 'perf'
  } else if (/^chore(\(.*\))?:/.test(lowerHeadline) || /^build(\(.*\))?:/.test(lowerHeadline) || /^ci(\(.*\))?:/.test(lowerHeadline)) {
    type = 'chore'
  }

  return { headline, body, type }
}

// POST /api/admin/blog/generate — auto-draft a rich, descriptive blog post from recent org commits
export async function POST() {
  const guard = await requireAdminUser()
  if (guard.response) return guard.response
  const adminUser = guard.user
  try {

    // 1. Determine the "since" date from the last published blog post
    const lastPost = await prisma.blog.findFirst({
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
      select: { publishedAt: true, createdAt: true },
    })

    const sinceDate = lastPost
      ? (lastPost.publishedAt || lastPost.createdAt)
      : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

    // 2. Fetch all public repos in the org
    const repos = await ghFetch(`${GITHUB_API}/orgs/${ORG}/repos?per_page=100&type=public&sort=updated`)
    if (!repos || !Array.isArray(repos) || repos.length === 0) {
      return NextResponse.json({ error: `No public repositories found for ${ORG}.` }, { status: 404 })
    }

    // 3. Fetch commits since the last post for each repo with full descriptive detail
    const sinceIso = sinceDate.toISOString()
    const repoCommits: { repo: string; commits: ParsedCommit[] }[] = []

    for (const repo of repos.slice(0, 30)) {
      const commits = await ghFetch(
        `${GITHUB_API}/repos/${repo.full_name}/commits?since=${encodeURIComponent(sinceIso)}&per_page=50`
      )
      if (commits && Array.isArray(commits) && commits.length > 0) {
        const parsedList: ParsedCommit[] = commits.map((c: any) => {
          const rawMsg = c.commit?.message || ''
          const { headline, body, type } = parseCommitMessage(rawMsg)
          return {
            headline,
            body,
            type,
            author: c.commit?.author?.name || c.commit?.committer?.name || 'Contributor',
            date: c.commit?.author?.date || c.commit?.committer?.date,
            sha: c.sha ? c.sha.substring(0, 7) : '',
            htmlUrl: c.html_url || '',
          }
        })

        repoCommits.push({
          repo: repo.name,
          commits: parsedList,
        })
      }
    }

    if (repoCommits.length === 0) {
      return NextResponse.json({
        error: 'No commits found since the last published post. Everything is up to date.',
      }, { status: 404 })
    }

    const totalCommits = repoCommits.reduce((sum, r) => sum + r.commits.length, 0)

    // 4. Build a rich, structured markdown draft with descriptive commit details
    const dateLabel = formatDate(new Date())
    const title = `Ecosystem Engineering Update — ${dateLabel}`
    const excerpt = `A comprehensive overview of ${totalCommits} updates, features, and architectural improvements across ${repoCommits.length} repositories.`

    let md = `## Executive Summary\n\n`
    md += `During this development cycle (from **${formatDate(sinceDate)}** to **${dateLabel}**), the **${ORG}** community completed **${totalCommits} commits** across **${repoCommits.length} core repositories**.\n\n`
    md += `Below is a detailed breakdown of features, stability enhancements, and system upgrades delivered across the ecosystem.\n\n`

    md += `## Detailed Repository Updates\n\n`

    for (const { repo, commits } of repoCommits) {
      md += `### 📦 \`${repo}\` (${commits.length} updates)\n\n`

      for (const c of commits.slice(0, 25)) {
        md += `#### ${c.headline}\n`
        md += `> **Author**: @${c.author} · **Commit**: [\`${c.sha}\`](${c.htmlUrl})\n\n`

        if (c.body && c.body.length > 0) {
          for (const line of c.body) {
            if (line.startsWith('-') || line.startsWith('*')) {
              md += `${line}\n`
            } else {
              md += `${line}\n\n`
            }
          }
          md += '\n'
        } else {
          md += `*Routine enhancements and maintenance for ${repo}.*\n\n`
        }
      }
      md += `---\n\n`
    }

    md += `## Next Milestones\n\n`
    md += `- Complete planned node benchmarks and stability verifications\n`
    md += `- Continue intent protocol integrations across connected modules\n`
    md += `- Review community contributions and RFCs\n`

    // 5. Create the draft (unpublished) and let the user review in the editor
    const slugBase = slugify(title)
    const existing = await prisma.blog.findUnique({ where: { slug: slugBase } })
    const slug = existing ? `${slugBase}-${Date.now().toString(36)}` : slugBase

    const post = await prisma.blog.create({
      data: {
        title,
        slug,
        excerpt,
        content: md,
        published: false,
        authorId: adminUser.id,
      },
    })

    revalidatePath('/')
    revalidatePath('/blog')

    return NextResponse.json({ id: post.id, slug: post.slug, title: post.title, commitCount: totalCommits }, { status: 201 })
  } catch (error) {
    console.error('Blog generate Error:', error)
    return NextResponse.json({ error: 'Failed to generate blog from commits' }, { status: 500 })
  }
}