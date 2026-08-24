import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET /api/banners — list active banners for a given placement (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const placement = searchParams.get('placement')
    const now = new Date()

    const banners = await prisma.banner.findMany({
      where: {
        active: true,
        placement: placement || undefined,
        OR: [
          { startAt: null },
          { startAt: { lte: now } },
        ],
        AND: [
          { endAt: null },
        ],
      },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    })

    // Filter endAt manually to avoid complex nested OR/AND
    const activeBanners = banners.filter((b) => !b.endAt || b.endAt >= now)

    return NextResponse.json(activeBanners)
  } catch (error) {
    console.error('Banners GET Error:', error)
    return NextResponse.json({ error: 'Failed to fetch banners' }, { status: 500 })
  }
}