import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateApiKey } from '@/lib/api-auth'
import { slugify } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const tags = await prisma.tag.findMany({ orderBy: { name: 'asc' } })
    return NextResponse.json(tags)
  } catch (error) {
    console.error('Error fetching tags:', error)
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const authError = validateApiKey(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const { name } = body

    if (!name) {
      return NextResponse.json({ error: 'name is required' }, { status: 400 })
    }

    const slug = slugify(name)
    const existing = await prisma.tag.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json(existing)
    }

    const tag = await prisma.tag.create({ data: { name, slug } })
    return NextResponse.json(tag, { status: 201 })
  } catch (error) {
    console.error('Error creating tag:', error)
    return NextResponse.json({ error: 'Failed to create tag' }, { status: 500 })
  }
}
