import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { DisplayMode, ProjectStatus } from '@prisma/client'

const ProjectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric and hyphens'),
  description: z.string().optional().nullable(),
  status: z.nativeEnum(ProjectStatus).optional().nullable(),
  link: z.string().url('Invalid URL').optional().nullable().or(z.literal('')),
  hostedUrl: z.string().url('Invalid URL').optional().nullable().or(z.literal('')),
  imageUrl: z.string().optional().nullable(),
  imageDisplay: z.nativeEnum(DisplayMode).default(DisplayMode.cover),
})

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

    const json = await req.json()
    const result = ProjectSchema.safeParse(json)

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid data', details: result.error.format() }, { status: 400 })
    }

    const data = result.data
    
    const existing = await prisma.project.findUnique({ where: { id: params.id } })
    if (!existing) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    if (data.slug) {
      const slugConflict = await prisma.project.findFirst({
        where: { slug: data.slug, NOT: { id: params.id } }
      })
      if (slugConflict) {
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
