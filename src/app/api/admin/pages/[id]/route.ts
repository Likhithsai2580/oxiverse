import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// GET /api/admin/pages/[id] — get a single page
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const page = await prisma.cmsPage.findUnique({
      where: { id: params.id },
      include: { parent: { select: { id: true, title: true, slug: true } } },
    })
    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }
    return NextResponse.json(page)
  } catch (error) {
    console.error('Page GET Error:', error)
    return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 })
  }
}

// PUT /api/admin/pages/[id] — update a page
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const guard = await requireAdmin()
  if (guard) return guard
  try {

    const body = await request.json()
    const existing = await prisma.cmsPage.findUnique({ where: { id: params.id } })
    if (!existing) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    if (body.slug && body.slug !== existing.slug) {
      const slugExists = await prisma.cmsPage.findUnique({ where: { slug: body.slug } })
      if (slugExists) {
        return NextResponse.json({ error: 'A page with this slug already exists' }, { status: 400 })
      }
      // Preserve the old URL: redirect /pages/<oldSlug> -> /pages/<newSlug> forever.
      // Upsert so re-saving the same slug change is idempotent.
      await prisma.slugRedirect.upsert({
        where: { oldPath: `/pages/${existing.slug}` },
        update: { newPath: `/pages/${body.slug}`, type: 'page' },
        create: {
          oldPath: `/pages/${existing.slug}`,
          newPath: `/pages/${body.slug}`,
          type: 'page',
        },
      })
    }

    if (body.parentId === params.id) {
      return NextResponse.json({ error: 'A page cannot be its own parent' }, { status: 400 })
    }

    const wasPublished = existing.published
    const page = await prisma.cmsPage.update({
      where: { id: params.id },
      data: {
        title: body.title ?? existing.title,
        slug: body.slug ?? existing.slug,
        excerpt: body.excerpt !== undefined ? body.excerpt : existing.excerpt,
        content: body.content !== undefined ? body.content : existing.content,
        published: body.published !== undefined ? body.published : existing.published,
        publishedAt: body.published && !wasPublished ? new Date() : existing.publishedAt,
        order: body.order !== undefined ? body.order : existing.order,
        parentId: body.parentId !== undefined ? body.parentId : existing.parentId,
        showInNav: body.showInNav !== undefined ? body.showInNav : existing.showInNav,
        navLabel: body.navLabel !== undefined ? body.navLabel : existing.navLabel,
        imageUrl: body.imageUrl !== undefined ? body.imageUrl : existing.imageUrl,
        imageDisplay: body.imageDisplay ?? existing.imageDisplay,
        metaTitle: body.metaTitle !== undefined ? body.metaTitle : existing.metaTitle,
        metaDescription: body.metaDescription !== undefined ? body.metaDescription : existing.metaDescription,
      },
      include: { parent: { select: { id: true, title: true, slug: true } } },
    })

    revalidatePath('/')
    revalidatePath('/pages')
    revalidatePath(`/pages/${page.slug}`)
    revalidatePath('/sitemap.xml')

    return NextResponse.json(page)
  } catch (error) {
    console.error('Page PUT Error:', error)
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 })
  }
}

// DELETE /api/admin/pages/[id] — delete a page (children get unparented)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const guard = await requireAdmin()
  if (guard) return guard
  try {

    const page = await prisma.cmsPage.findUnique({ where: { id: params.id } })
    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    await prisma.cmsPage.updateMany({
      where: { parentId: params.id },
      data: { parentId: null },
    })

    await prisma.cmsPage.delete({ where: { id: params.id } })

    revalidatePath('/')
    revalidatePath('/sitemap.xml')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Page DELETE Error:', error)
    return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 })
  }
}