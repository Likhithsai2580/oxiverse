import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: params.id }
    })
    return NextResponse.json(project)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const data = await req.json()
    
    const existing = await prisma.project.findUnique({ where: { id: params.id } })
    if (!existing) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    if (data.slug) {
      const existing = await prisma.project.findFirst({
        where: { slug: data.slug, NOT: { id: params.id } }
      })
      if (existing) {
        return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
      }
    }

    const project = await prisma.project.update({
      where: { id: params.id },
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        status: data.status,
        link: data.link,
        hostedUrl: data.hostedUrl,
        imageUrl: data.imageUrl,
        imageDisplay: data.imageDisplay,
      }
    })
    return NextResponse.json(project)
  } catch (err: any) {
    console.error('PUT ecosystem error:', err.message)
    return NextResponse.json({ error: err.message || 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await prisma.project.delete({
      where: { id: params.id }
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
