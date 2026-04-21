import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { slugify } from '@/lib/utils'

export const dynamic = 'force-dynamic'

// GET /api/research - List all research papers
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published')
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '10') || 10))
    const page = Math.max(1, parseInt(searchParams.get('page') || '1') || 1)

    const where = published !== null ? { published: published === 'true' } : {}

    const [papers, total] = await Promise.all([
      prisma.researchPaper.findMany({
        where,
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: { id: true, name: true, email: true },
          },
        },
      }),
      prisma.researchPaper.count({ where }),
    ])

    return NextResponse.json({
      papers,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching research papers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch research papers' },
      { status: 500 }
    )
  }
}

// POST /api/research - Create a new research paper
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Double check user exists in DB
    const user = await prisma.user.findUnique({ where: { id: session.user.id } })
    if (!user) {
      return NextResponse.json(
        { error: 'Session invalid or user deleted. Please log out and log in again.' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, abstract, content, pdfUrl, published, imageUrl, imageDisplay, categoryId, tags } = body

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    const slug = slugify(title)

    // Check if slug already exists
    const existing = await prisma.researchPaper.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json(
        { error: 'A paper with this title already exists' },
        { status: 400 }
      )
    }

    const paper = await prisma.researchPaper.create({
      data: {
        title,
        slug,
        abstract,
        content: content || '',
        pdfUrl: pdfUrl || null,
        published: published || false,
        publishedAt: published ? new Date() : null,
        imageUrl,
        imageDisplay: imageDisplay || 'cover',
        authorId: session.user.id,
        categoryId: categoryId || null,
        tags: tags ? {
          connect: tags.map((tagId: string) => ({ id: tagId }))
        } : undefined,
      },
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
        category: true,
        tags: true,
      },
    })

    return NextResponse.json(paper, { status: 201 })
  } catch (error) {
    console.error('Error creating research paper:', error)
    return NextResponse.json(
      { error: 'Failed to create research paper' },
      { status: 500 }
    )
  }
}
