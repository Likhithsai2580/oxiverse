import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// GET /api/admin/pages — list all CMS pages (flat, with parent info)
export async function GET() {
  const guard = await requireAdmin()
  if (guard) return guard
  try {
    const pages = await prisma.cmsPage.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      include: {
        parent: { select: { id: true, title: true, slug: true } },
        _count: { select: { children: true } },
      },
    })
    return NextResponse.json(pages)
  } catch (error) {
    console.error('Pages GET Error:', error)
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 })
  }
}

// POST /api/admin/pages — create a CMS page
export async function POST(request: NextRequest) {
  const guard = await requireAdmin()
  if (guard) return guard
  try {

    const body = await request.json()
    const { title, slug, excerpt, content, published, order, parentId, showInNav, navLabel, imageUrl, imageDisplay, metaTitle, metaDescription } = body

    if (!title || !slug) {
      return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 })
    }

    const existing = await prisma.cmsPage.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json({ error: 'A page with this slug already exists' }, { status: 400 })
    }

    const page = await prisma.cmsPage.create({
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        content: content || '',
        published: published || false,
        publishedAt: published ? new Date() : null,
        order: order ?? 0,
        parentId: parentId || null,
        showInNav: showInNav || false,
        navLabel: navLabel || null,
        imageUrl: imageUrl || null,
        imageDisplay: imageDisplay || 'cover',
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
      },
      include: { parent: { select: { id: true, title: true, slug: true } } },
    })

    revalidatePath('/')
    revalidatePath('/sitemap.xml')

    return NextResponse.json(page, { status: 201 })
  } catch (error) {
    console.error('Pages POST Error:', error)
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 })
  }
}