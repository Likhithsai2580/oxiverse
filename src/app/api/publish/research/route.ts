import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { slugify } from '@/lib/utils'
import { revalidatePath } from 'next/cache'
import { validateApiKey } from '@/lib/api-auth'
import { resolveAuthor, resolveCategory, resolveTags } from '../helpers'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const authError = validateApiKey(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const { title, content, abstract, pdfUrl, published, imageUrl, category, tags } = body

    if (!title) {
      return NextResponse.json({ error: 'title is required' }, { status: 400 })
    }

    const slug = slugify(title)
    const existing = await prisma.researchPaper.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json({ error: 'A paper with this title already exists' }, { status: 409 })
    }

    const authorId = await resolveAuthor()
    const categoryRecord = category ? await resolveCategory(category) : null
    const tagRecords = tags ? await resolveTags(tags) : []

    const paper = await prisma.researchPaper.create({
      data: {
        title,
        slug,
        abstract: abstract || null,
        content: content || null,
        pdfUrl: pdfUrl || null,
        published: published || false,
        publishedAt: published ? new Date() : null,
        imageUrl: imageUrl || null,
        authorId,
        categoryId: categoryRecord?.id || null,
        tags: tagRecords.length > 0 ? { connect: tagRecords } : undefined,
      },
      include: {
        author: { select: { id: true, name: true, email: true } },
        category: true,
        tags: true,
      },
    })

    revalidatePath('/')
    revalidatePath('/research')
    revalidatePath('/sitemap.xml')

    return NextResponse.json(paper, { status: 201 })
  } catch (error) {
    console.error('Error publishing research paper:', error)
    return NextResponse.json({ error: 'Failed to publish research paper' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const authError = validateApiKey(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const { slug, title, content, abstract, pdfUrl, published, imageUrl, category, tags } = body

    if (!slug) {
      return NextResponse.json({ error: 'slug is required to update a paper' }, { status: 400 })
    }

    const existing = await prisma.researchPaper.findUnique({ where: { slug } })
    if (!existing) {
      return NextResponse.json({ error: 'No paper found with this slug' }, { status: 404 })
    }

    const newSlug = title ? slugify(title) : slug
    if (newSlug !== slug) {
      const slugExists = await prisma.researchPaper.findUnique({ where: { slug: newSlug } })
      if (slugExists) {
        return NextResponse.json({ error: 'A paper with the new title already exists' }, { status: 409 })
      }
    }

    const categoryRecord = category ? await resolveCategory(category) : undefined
    const tagRecords = tags ? await resolveTags(tags) : undefined

    const paper = await prisma.researchPaper.update({
      where: { slug },
      data: {
        ...(title && { title, slug: newSlug }),
        ...(content !== undefined && { content }),
        ...(abstract !== undefined && { abstract }),
        ...(pdfUrl !== undefined && { pdfUrl }),
        ...(published !== undefined && { published, publishedAt: published ? new Date() : null }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(categoryRecord !== undefined && { categoryId: categoryRecord?.id || null }),
        ...(tagRecords !== undefined && { tags: { set: tagRecords } }),
      },
      include: {
        author: { select: { id: true, name: true, email: true } },
        category: true,
        tags: true,
      },
    })

    revalidatePath('/')
    revalidatePath('/research')
    revalidatePath('/sitemap.xml')

    return NextResponse.json(paper)
  } catch (error) {
    console.error('Error updating research paper:', error)
    return NextResponse.json({ error: 'Failed to update research paper' }, { status: 500 })
  }
}
