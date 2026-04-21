import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { slugify } from '@/lib/utils'

export const dynamic = 'force-dynamic'

// GET /api/blog - List all blog posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published')
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '10') || 10))
    const page = Math.max(1, parseInt(searchParams.get('page') || '1') || 1)

    const where = published !== null ? { published: published === 'true' } : {}

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
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
      prisma.blog.count({ where }),
    ])

    return NextResponse.json({
      blogs,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    )
  }
}

// POST /api/blog - Create a new blog post
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Double check user exists in DB (to handle session-DB mismatch after resets)
    const user = await prisma.user.findUnique({ where: { id: session.user.id } })
    if (!user) {
      return NextResponse.json(
        { error: 'Session invalid or user deleted. Please log out and log in again.' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, excerpt, content, published, imageUrl, imageDisplay, categoryId, tags } = body

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    const slug = slugify(title)

    // Check if slug already exists
    const existing = await prisma.blog.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json(
        { error: 'A post with this title already exists' },
        { status: 400 }
      )
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        excerpt,
        content: content || '',
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

    return NextResponse.json(blog, { status: 201 })
  } catch (error) {
    console.error('Error creating blog:', error)
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    )
  }
}
