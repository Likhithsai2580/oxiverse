import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  const guard = await requireAdmin()
  if (guard) return guard
  try {
    const tags = await prisma.tag.findMany()
    return NextResponse.json(tags)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin()
  if (guard) return guard
  try {
    const data = await req.json()
    const tag = await prisma.tag.create({
      data: {
        name: data.name,
        slug: data.slug,
      }
    })
    return NextResponse.json(tag)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create tag' }, { status: 500 })
  }
}

// DELETE /api/admin/tags?id=<id> — delete a tag
export async function DELETE(req: NextRequest) {
  const guard = await requireAdmin()
  if (guard) return guard
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    await prisma.tag.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete tag' }, { status: 500 })
  }
}
