import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { requireAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const posters = await prisma.poster.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(posters)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posters' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin()
  if (guard) return guard
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await req.json()
    const { title, imageUrl, link } = data

    if (!title || !imageUrl) {
      return NextResponse.json({ error: 'Title and Image URL are required' }, { status: 400 })
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const poster = await prisma.poster.create({
      data: {
        title,
        slug,
        imageUrl,
        link,
      },
    })

    return NextResponse.json(poster)
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'A poster with this title already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create poster' }, { status: 500 })
  }
}
