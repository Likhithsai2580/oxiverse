import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { slugify } from '@/lib/utils'
import { revalidatePath } from 'next/cache'

// GET /api/blog/[id] - Get a single blog post
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: params.id },
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
        category: true,
        tags: true,
      },
    })

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(blog)
  } catch (error) {
    console.error('Error fetching blog:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog' },
      { status: 500 }
    )
  }
}

// PUT /api/blog/[id] - Update a blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, excerpt, content, published, imageUrl, imageDisplay, categoryId, tags } = body

    const existing = await prisma.blog.findUnique({ where: { id: params.id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    const updateData: any = {}
    if (title && title !== existing.title) {
      updateData.title = title
      updateData.slug = slugify(title)
    }
    if (excerpt !== undefined) updateData.excerpt = excerpt
    if (content !== undefined) updateData.content = content
    if (published !== undefined) {
      updateData.published = published
      updateData.publishedAt = published ? new Date() : null
    }
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl
    if (imageDisplay !== undefined) updateData.imageDisplay = imageDisplay
    if (categoryId !== undefined) updateData.categoryId = categoryId || null
    if (tags !== undefined) {
      updateData.tags = {
        set: tags.map((tagId: string) => ({ id: tagId }))
      }
    }

    const blog = await prisma.blog.update({
      where: { id: params.id },
      data: updateData,
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
        category: true,
        tags: true,
      },
    })

    revalidatePath('/')
    revalidatePath('/blog')
    revalidatePath(`/blog/${blog.slug}`)
    revalidatePath('/sitemap.xml')

    return NextResponse.json(blog)
  } catch (error) {
    console.error('Error updating blog:', error)
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    )
  }
}

// DELETE /api/blog/[id] - Delete a blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const existing = await prisma.blog.findUnique({ where: { id: params.id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    await prisma.blog.delete({ where: { id: params.id } })

    revalidatePath('/')
    revalidatePath('/blog')
    revalidatePath(`/blog/${existing.slug}`)
    revalidatePath('/sitemap.xml')

    return NextResponse.json({ message: 'Blog post deleted successfully' })
  } catch (error) {
    console.error('Error deleting blog:', error)
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    )
  }
}
