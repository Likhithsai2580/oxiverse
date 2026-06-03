import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Static redirect map for known renamed/moved slugs.
// This runs at the edge with zero DB calls.
// When you rename a post, add the old→new mapping here AND in the
// SlugRedirect table (for the page-component fallback).
const STATIC_REDIRECTS: Record<string, string> = {
  // Blog renames
  '/blog/ravana-v2-building-a-cognitive-architecture-with-bounded-agi':
    '/blog/building-ravana-v2-a-proto-homeostatic-cognitive-architecture',
  '/blog/intentforge-architecture-how-we-built-a-privacy-first-search-engine-with-tor':
    '/blog/intentforge-architecture',
  '/blog/intent-engine-building-a-selfimproving-search-system':
    '/blog/intent-engine',
  // Research renames
  '/research/ravana-cognitive-dissonance-in-agi-alignment':
    '/research/ravana-cognitive-dissonance',
  '/research/intentforge-a-privacy-preserving-self-improving-intent-driven-search-platform':
    '/research/intentforge',
  // Deleted pages → redirect to closest parent
  '/health': '/',
}

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const host = request.headers.get('host') || ''
  const pathname = url.pathname

  // 0. Markdown content negotiation: rewrite to markdown proxy when agent requests it
  const accept = request.headers.get('accept') || ''
  const skipMdConvert = request.headers.get('x-md-convert')
  if (accept.includes('text/markdown') && skipMdConvert !== 'skip') {
    const mdUrl = new URL(url)
    mdUrl.pathname = '/api/md'
    mdUrl.searchParams.set('path', pathname)
    // Preserve query params from the original request
    const originalParams = url.searchParams.toString()
    if (originalParams) {
      mdUrl.searchParams.set('query', originalParams)
    }
    return NextResponse.rewrite(mdUrl)
  }

  // 1. Canonical domain: force https://oxiverse.com (no www, no http)
  //    This fixes "Page with redirect" in Google Search Console.
  const isWww = host.startsWith('www.')
  const isHttp = url.protocol === 'http:'

  if (isWww || isHttp) {
    const canonical = new URL(`https://oxiverse.com${pathname}${url.search}`)
    return NextResponse.redirect(canonical, 301)
  }

  // 2. Static slug redirects (301 permanent)
  const target = STATIC_REDIRECTS[pathname]
  if (target) {
    return NextResponse.redirect(new URL(target, url.origin), 301)
  }

  // 3. Trailing-slash normalization (defense in depth; trailingSlash:false in config)
  if (pathname !== '/' && pathname.endsWith('/')) {
    const trimmed = new URL(pathname.replace(/\/+$/, '') + url.search, url.origin)
    return NextResponse.redirect(trimmed, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
