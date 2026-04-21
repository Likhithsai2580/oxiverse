import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { saveFile } from '@/lib/storage'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string || 'blog'
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Save locally and backup to Supabase
    const result = await saveFile(file, type)

    // Log the asset in the database
    await prisma.mediaAsset.create({
      data: {
        fileName: file.name,
        url: result.url,
        type: file.type,
        category: type,
        size: file.size,
      }
    })

    return NextResponse.json(result)
  } catch (err) {
    console.error('Local Upload Error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
