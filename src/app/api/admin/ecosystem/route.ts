import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { DisplayMode, ProjectStatus } from '@prisma/client'

export const dynamic = 'force-dynamic'

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

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(projects)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const json = await req.json()
    const result = ProjectSchema.safeParse(json)

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid data', details: result.error.format() }, { status: 400 })
    }

    const data = result.data
    const project = await prisma.project.create({
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
  } catch (err) {
    console.error('Project create error:', err)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
