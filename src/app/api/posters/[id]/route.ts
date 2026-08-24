import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { requireAdmin } from '@/lib/auth'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const poster = await prisma.poster.findUnique({
      where: { id: params.id },
    })
    
    if (!poster) {
      return NextResponse.json({ error: 'Poster not found' }, { status: 404 })
    }
    
    return NextResponse.json(poster)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch poster' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const guard = await requireAdmin()
  if (guard) return guard
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await req.json()
    const { title, imageUrl, link } = data

    const poster = await prisma.poster.update({
      where: { id: params.id },
      data: {
        title,
        imageUrl,
        link,
      },
    })

    return NextResponse.json(poster)
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update poster' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const guard = await requireAdmin()
  if (guard) return guard
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await prisma.poster.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete poster' }, { status: 500 })
  }
}
