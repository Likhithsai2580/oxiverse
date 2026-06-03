import { NextRequest, NextResponse } from 'next/server'
import TurndownService from 'turndown'

// Rough token estimation: ~4 chars per token for English text
function estimateTokens(text: string): number {
  return Math.round(text.length / 4)
}

// Strip navigation, headers, footers, scripts, styles - non-content elements
function stripNonContent(html: string): string {
  // Remove scripts, styles, nav, header, footer, aside, noscript
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<aside[\s\S]*?<\/aside>/gi, '')
    .replace(/<form[\s\S]*?<\/form>/gi, '')
}

// Extract YAML frontmatter from HTML meta tags
function extractFrontmatter(html: string): { title: string; description: string } {
  const titleMatch = html.match(/<meta\s+name="title"\s+content="([^"]*)"[^>]*>/i)
    || html.match(/<meta\s+property="og:title"\s+content="([^"]*)"[^>]*>/i)
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"[^>]*>/i)
    || html.match(/<meta\s+property="og:description"\s+content="([^"]*)"[^>]*>/i)

  return {
    title: titleMatch ? titleMatch[1] : '',
    description: descMatch ? descMatch[1] : '',
  }
}

// Extract JSON-LD blocks
function extractJsonLd(html: string): string[] {
  const blocks: string[] = []
  const regex = /<script\s+type="application\/ld\+json"[\s\S]*?>([\s\S]*?)<\/script>/gi
  let match
  while ((match = regex.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(match[1].trim())
      blocks.push(JSON.stringify(parsed))
    } catch {
      // Skip invalid JSON-LD
    }
  }
  return blocks
}

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const path = searchParams.get('path') || '/'
    const query = searchParams.get('query') || ''

    // Construct the URL to fetch
    const protocol = request.headers.get('x-forwarded-proto') || 'https'
    const host = request.headers.get('host') || 'oxiverse.com'
    const fetchUrl = `${protocol}://${host}${path}${query ? '?' + query : ''}`

    // Fetch the page without the markdown accept header to get HTML
    const response = await fetch(fetchUrl, {
      headers: {
        'x-md-convert': 'skip', // Signal middleware to skip markdown negotiation
        'User-Agent': 'Oxiverse-Markdown-Converter/1.0',
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch page: ${response.status}` },
        { status: response.status }
      )
    }

    const html = await response.text()

    // Strip non-content elements
    const cleanHtml = stripNonContent(html)

    // Extract frontmatter and JSON-LD
    const { title, description } = extractFrontmatter(html)
    const jsonLdBlocks = extractJsonLd(html)

    // Convert HTML to markdown
    const turndownService = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
      emDelimiter: '*',
      bulletListMarker: '-',
    })

    // Preserve code blocks
    turndownService.addRule('preservePre', {
      filter: 'pre',
      replacement: (content) => {
        return `\`\`\`\n${content}\n\`\`\``
      },
    })

    // Preserve links
    turndownService.addRule('preserveLinks', {
      filter: 'a',
      replacement: (content, node) => {
        const href = (node as HTMLElement).getAttribute('href')
        if (href) {
          return `[${content}](${href})`
        }
        return content
      },
    })

    let markdown = turndownService.turndown(cleanHtml)

    // Prepend YAML frontmatter if available
    if (title || description) {
      const frontmatter: string[] = ['---']
      if (title) frontmatter.push(`title: ${title}`)
      if (description) frontmatter.push(`description: ${description}`)
      frontmatter.push('---')
      markdown = frontmatter.join('\n') + '\n\n' + markdown
    }

    // Append JSON-LD at the end if present
    if (jsonLdBlocks.length > 0) {
      markdown += '\n\n```json\n' + jsonLdBlocks.join('\n') + '\n```\n'
    }

    const tokenCount = estimateTokens(markdown)

    // Return with proper headers
    return new NextResponse(markdown, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'x-markdown-tokens': String(tokenCount),
        'Vary': 'Accept',
        'Cache-Control': 'public, max-age=60, s-maxage=60',
      },
    })
  } catch (error) {
    console.error('Markdown conversion error:', error)
    return NextResponse.json(
      { error: 'Failed to convert page to markdown' },
      { status: 500 }
    )
  }
}
