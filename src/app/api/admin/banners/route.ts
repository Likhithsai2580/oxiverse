import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// GET /api/admin/banners — list all banners
export async function GET() {
  const guard = await requireAdmin()
  if (guard) return guard
  try {
    const banners = await prisma.banner.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    })
    return NextResponse.json(banners)
  } catch (error) {
    console.error('Banners GET Error:', error)
    return NextResponse.json({ error: 'Failed to fetch banners' }, { status: 500 })
  }
}

// POST /api/admin/banners — create a banner
export async function POST(request: NextRequest) {
  const guard = await requireAdmin()
  if (guard) return guard
  try {

    const body = await request.json()
    const { title, imageUrl, message, link, linkText, placement, active, order, startAt, endAt } = body

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    const banner = await prisma.banner.create({
      data: {
        title,
        imageUrl: imageUrl || null,
        message: message || null,
        link: link || null,
        linkText: linkText || null,
        placement: placement || 'announcement',
        active: active ?? true,
        order: order ?? 0,
        startAt: startAt ? new Date(startAt) : null,
        endAt: endAt ? new Date(endAt) : null,
      },
    })

    revalidatePath('/')
    return NextResponse.json(banner, { status: 201 })
  } catch (error) {
    console.error('Banners POST Error:', error)
    return NextResponse.json({ error: 'Failed to create banner' }, { status: 500 })
  }
}