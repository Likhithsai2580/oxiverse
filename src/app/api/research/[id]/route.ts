import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { slugify } from '@/lib/utils'
import { revalidatePath } from 'next/cache'

// GET /api/research/[id] - Get a single research paper
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const paper = await prisma.researchPaper.findUnique({
      where: { id: params.id },
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
        category: true,
        tags: true,
      },
    })

    if (!paper) {
      return NextResponse.json(
        { error: 'Research paper not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(paper)
  } catch (error) {
    console.error('Error fetching research paper:', error)
    return NextResponse.json(
      { error: 'Failed to fetch research paper' },
      { status: 500 }
    )
  }
}

// PUT /api/research/[id] - Update a research paper
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
    const { title, abstract, content, pdfUrl, published, imageUrl, imageDisplay, categoryId, tags } = body

    const existing = await prisma.researchPaper.findUnique({ where: { id: params.id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'Research paper not found' },
        { status: 404 }
      )
    }

    const updateData: any = {}
    if (title && title !== existing.title) {
      updateData.title = title
      updateData.slug = slugify(title)
    }
    if (abstract !== undefined) updateData.abstract = abstract
    if (content !== undefined) updateData.content = content
    if (pdfUrl !== undefined) updateData.pdfUrl = pdfUrl
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

    const paper = await prisma.researchPaper.update({
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
    revalidatePath('/research')
    revalidatePath(`/research/${paper.slug}`)
    revalidatePath('/sitemap.xml')

    return NextResponse.json(paper)
  } catch (error) {
    console.error('Error updating research paper:', error)
    return NextResponse.json(
      { error: 'Failed to update research paper' },
      { status: 500 }
    )
  }
}

// DELETE /api/research/[id] - Delete a research paper
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

    const existing = await prisma.researchPaper.findUnique({ where: { id: params.id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'Research paper not found' },
        { status: 404 }
      )
    }

    await prisma.researchPaper.delete({ where: { id: params.id } })

    revalidatePath('/')
    revalidatePath('/research')
    revalidatePath(`/research/${existing.slug}`)
    revalidatePath('/sitemap.xml')

    return NextResponse.json({ message: 'Research paper deleted successfully' })
  } catch (error) {
    console.error('Error deleting research paper:', error)
    return NextResponse.json(
      { error: 'Failed to delete research paper' },
      { status: 500 }
    )
  }
}
