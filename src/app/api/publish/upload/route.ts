import { NextRequest, NextResponse } from 'next/server'
import { saveFile } from '@/lib/storage'
import { prisma } from '@/lib/prisma'
import { validateApiKey } from '@/lib/api-auth'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const authError = validateApiKey(request)
  if (authError) return authError

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'file is required (multipart/form-data)' }, { status: 400 })
    }

    const isPdf = file.type === 'application/pdf' || file.name.endsWith('.pdf')
    const subDir = isPdf ? 'pdfs' : 'images'

    const result = await saveFile(file, subDir)

    await prisma.mediaAsset.create({
      data: {
        fileName: file.name,
        url: result.url,
        type: file.type,
        category: subDir,
        size: file.size,
      },
    })

    return NextResponse.json({
      url: result.url,
      fileName: file.name,
      type: file.type,
      size: file.size,
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
