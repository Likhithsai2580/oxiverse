import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // We are removing manual domain/slash redirects from here because:
  // 1. Next.js handles trailing slashes via `trailingSlash: false` in next.config.js
  // 2. Vercel handles domain redirects (www vs non-www) more efficiently at the edge.
  // This prevents the "Too many redirects" loop you encountered.
  
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
