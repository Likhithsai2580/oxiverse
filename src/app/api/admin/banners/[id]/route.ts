import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// GET /api/admin/banners/[id] — get a single banner
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const banner = await prisma.banner.findUnique({ where: { id: params.id } })
    if (!banner) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 })
    }
    return NextResponse.json(banner)
  } catch (error) {
    console.error('Banner GET Error:', error)
    return NextResponse.json({ error: 'Failed to fetch banner' }, { status: 500 })
  }
}

// PUT /api/admin/banners/[id] — update a banner
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const guard = await requireAdmin()
  if (guard) return guard
  try {

    const body = await request.json()
    const existing = await prisma.banner.findUnique({ where: { id: params.id } })
    if (!existing) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 })
    }

    const banner = await prisma.banner.update({
      where: { id: params.id },
      data: {
        title: body.title ?? existing.title,
        imageUrl: body.imageUrl !== undefined ? body.imageUrl : existing.imageUrl,
        message: body.message !== undefined ? body.message : existing.message,
        link: body.link !== undefined ? body.link : existing.link,
        linkText: body.linkText !== undefined ? body.linkText : existing.linkText,
        placement: body.placement ?? existing.placement,
        active: body.active !== undefined ? body.active : existing.active,
        order: body.order !== undefined ? body.order : existing.order,
        startAt: body.startAt !== undefined ? (body.startAt ? new Date(body.startAt) : null) : existing.startAt,
        endAt: body.endAt !== undefined ? (body.endAt ? new Date(body.endAt) : null) : existing.endAt,
      },
    })

    revalidatePath('/')
    return NextResponse.json(banner)
  } catch (error) {
    console.error('Banner PUT Error:', error)
    return NextResponse.json({ error: 'Failed to update banner' }, { status: 500 })
  }
}

// DELETE /api/admin/banners/[id] — delete a banner
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const guard = await requireAdmin()
  if (guard) return guard
  try {

    const banner = await prisma.banner.findUnique({ where: { id: params.id } })
    if (!banner) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 })
    }

    await prisma.banner.delete({ where: { id: params.id } })

    revalidatePath('/')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Banner DELETE Error:', error)
    return NextResponse.json({ error: 'Failed to delete banner' }, { status: 500 })
  }
}