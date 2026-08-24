import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

// GET /api/admin/redirects — list all redirects
export async function GET() {
  const guard = await requireAdmin()
  if (guard) return guard
  const redirects = await prisma.slugRedirect.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(redirects)
}

// POST /api/admin/redirects — create a redirect
export async function POST(request: NextRequest) {
  const guard = await requireAdmin()
  if (guard) return guard
  const body = await request.json()
  const { oldPath, newPath, type } = body

  if (!oldPath || !newPath) {
    return NextResponse.json({ error: 'oldPath and newPath are required' }, { status: 400 })
  }

  const redirect = await prisma.slugRedirect.upsert({
    where: { oldPath },
    update: { newPath, type: type || 'blog' },
    create: { oldPath, newPath, type: type || 'blog' },
  })

  return NextResponse.json(redirect, { status: 201 })
}

// DELETE /api/admin/redirects — delete a redirect
export async function DELETE(request: NextRequest) {
  const guard = await requireAdmin()
  if (guard) return guard
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 })
  }

  await prisma.slugRedirect.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
