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
  // Legacy paths
  '/tos': '/terms',
  // Deleted pages → redirect to closest parent
  '/health': '/',
}

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const host = request.headers.get('host') || ''
  const pathname = url.pathname
  const isDev = process.env.NODE_ENV === 'development' || host.startsWith('localhost') || host.startsWith('127.0.0.1')

  console.log(`[Middleware] ${request.method} ${host}${pathname} (isDev: ${isDev})`)

  let response: NextResponse

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
    response = NextResponse.rewrite(mdUrl)
  } else {
    // 1. Static slug redirects (permanent 301)
    const targetRedirect = STATIC_REDIRECTS[pathname]

    // Determine final destination path (redirect target or current path)
    let destinationPath = targetRedirect || pathname

    // 2. Trailing-slash normalization (defense in depth; trailingSlash:false in config)
    if (destinationPath !== '/' && destinationPath.endsWith('/')) {
      destinationPath = destinationPath.replace(/\/+$/, '')
    }

    // 3. Domain normalization & single-hop redirection
    const isWww = host.startsWith('www.')
    const isHttp = url.protocol === 'http:' && !isDev // Only force HTTPS in production
    const hasPathRedirect = destinationPath !== pathname

    if (isWww || isHttp || hasPathRedirect) {
      // Redirect directly to the correct domain and destination path in a single hop.
      // In development, preserve localhost origin instead of redirecting to oxiverse.com
      const baseOrigin = isDev ? url.origin : 'https://oxiverse.com'
      const canonical = new URL(`${baseOrigin}${destinationPath}${url.search}`)
      response = NextResponse.redirect(canonical, 301)
    } else {
      response = NextResponse.next()
    }
  }

  // Inject noindex for non-production/Vercel domains
  // to prevent Google crawling them and complaining about redirects/404s.
  const isCanonical = host === 'oxiverse.com'
  if (!isCanonical && !isDev) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }

  return response
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
