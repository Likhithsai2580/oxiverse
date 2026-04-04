import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Section, SectionHeader, Card } from '@/components/ui'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const revalidate = 3600

interface PageProps {
  params: { slug: string }
  searchParams: { path?: string }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await prisma.project.findUnique({ where: { slug: params.slug } })
  if (!project) return { title: 'Project Not Found' }
  return {
    title: `${project.title} Docs | Oxiverse`,
    description: `Documentation for ${project.title}`,
  }
}

async function fetchGithubContent(repoUrl: string, path: string = 'README.md') {
  if (!repoUrl?.startsWith('https://github.com/')) return null
  const repoPath = repoUrl.replace('https://github.com/', '').replace(/\/$/, '')
  
  // Try to get file content (raw)
  const branches = ['main', 'master']
  for (const branch of branches) {
    const rawUrl = `https://raw.githubusercontent.com/${repoPath}/${branch}/${path}`
    try {
      const res = await fetch(rawUrl, { next: { revalidate: 3600 } })
      if (res.ok) return { type: 'file', content: await res.text() }
    } catch (e) {}
  }

  // If not a file, try to get directory listing via GitHub API (optional/fallback)
  // For simplicity and user request of "show files in docs", we'll check common names
  return null
}

async function getRepoFiles(repoUrl: string, dir: string = 'docs') {
    if (!repoUrl?.startsWith('https://github.com/')) return []
    const repoPath = repoUrl.replace('https://github.com/', '').replace(/\/$/, '')
    
    // Use GitHub API to list files in a directory
    try {
        const res = await fetch(`https://api.github.com/repos/${repoPath}/contents/${dir}`, {
            headers: { 'Accept': 'application/vnd.github.v3+json' },
            next: { revalidate: 3600 }
        })
        if (res.ok) {
            const data = await res.json()
            return Array.isArray(data) ? data : []
        }
    } catch (e) {}
    return []
}

export default async function ProjectDocsPage({ params, searchParams }: PageProps) {
  const project = await prisma.project.findUnique({ where: { slug: params.slug } })
  if (!project) notFound()

  const currentPath = searchParams.path || 'README.md'
  const fileData = await fetchGithubContent(project.link || '', currentPath)
  const docsFiles = await getRepoFiles(project.link || '', 'docs')

  return (
    <main className="min-h-screen bg-transparent pt-20">
      <Navigation />
      <Section id="docs-viewer" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-28 space-y-6">
              <div>
                <Link href="/docs" className="text-primary-400 hover:text-primary-300 text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-8">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  All Projects
                </Link>
                <h2 className="text-white font-bold text-lg mb-4">{project.title}</h2>
                <nav className="space-y-1">
                  <Link 
                    href={`/docs/${project.slug}`}
                    className={`block px-3 py-2 rounded-lg text-sm transition-colors ${currentPath === 'README.md' ? 'bg-primary-500/10 text-primary-400 font-medium' : 'text-dark-400 hover:text-white hover:bg-white/5'}`}
                  >
                    Introduction
                  </Link>
                  {docsFiles.filter((f: any) => f.name.endsWith('.md')).map((file: any) => (
                    <Link 
                      key={file.path}
                      href={`/docs/${project.slug}?path=${file.path}`}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${currentPath === file.path ? 'bg-primary-500/10 text-primary-400 font-medium' : 'text-dark-400 hover:text-white hover:bg-white/5'}`}
                    >
                      {file.name.replace('.md', '').replaceAll('-', ' ').replaceAll('_', ' ')}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <Card className="prose prose-invert prose-primary max-w-none bg-white/[0.02] border-white/5 p-8 sm:p-12">
              {fileData?.type === 'file' ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {fileData.content}
                </ReactMarkdown>
              ) : (
                <div className="text-center py-20">
                   <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6 text-dark-500">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    </div>
                    <p className="text-dark-300">File not found or documentation is unavailable for this project.</p>
                </div>
              )}
            </Card>
          </div>

        </div>
      </Section>
      <Footer />
    </main>
  )
}
