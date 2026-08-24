import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// GET /api/publish/pages — list published CMS pages (for nav, footer, sitemap)
// Default returns ONLY published pages. `?all=true` returns every page (including
// drafts) but requires an admin session, so drafts are never exposed by default.
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeUnpublished = searchParams.get('all') === 'true'

    if (includeUnpublished) {
      const guard = await requireAdmin()
      if (guard) return guard
    }

    const pages = await prisma.cmsPage.findMany({
      where: includeUnpublished ? {} : { published: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        title: true,
        slug: true,
        navLabel: true,
        showInNav: true,
        parentId: true,
        published: true,
        order: true,
        excerpt: true,
        imageUrl: true,
        updatedAt: true,
      },
    })

    return NextResponse.json(pages)
  } catch (error) {
    console.error('Public Pages GET Error:', error)
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 })
  }
}