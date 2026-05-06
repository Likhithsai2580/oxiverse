import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const host = request.headers.get('host')

  // 1. Enforce Apex Domain (non-www) for canonical consistency
  // This helps resolve "Duplicate without user-selected canonical" issues
  if (host === 'www.oxiverse.com') {
    url.host = 'oxiverse.com'
    return NextResponse.redirect(url, 301)
  }

  // 2. Ensure we are not using trailing slashes (Next.js default, but being explicit for SEO)
  // This helps resolve "Page with redirect" issues
  if (
    request.nextUrl.pathname !== '/' &&
    request.nextUrl.pathname.endsWith('/')
  ) {
    url.pathname = url.pathname.slice(0, -1)
    return NextResponse.redirect(url, 301)
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
