import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { supabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    
    // 1. Get from Database for speed and metadata
    const dbAssets = await prisma.mediaAsset.findMany({
      where: category ? { category } : {},
      orderBy: { createdAt: 'desc' }
    })

    // 2. Fetch from Supabase for "Already existing" files
    const bucket = 'images'
    const subDirs = category ? [category] : ['blog', 'research', 'ecosystem', 'images']
    
    const supabaseAssets: any[] = []
    
    await Promise.all(subDirs.map(async (dir) => {
      try {
        const { data, error } = await supabaseAdmin.storage
          .from(bucket)
          .list(dir, {
            limit: 50,
            sortBy: { column: 'name', order: 'desc' },
          })

        if (data && !error) {
          data.forEach(file => {
            if (file.name === '.emptyFolderPlaceholder') return
            
            const publicUrl = supabaseAdmin.storage.from(bucket).getPublicUrl(`${dir}/${file.name}`).data.publicUrl
            
            // Avoid duplicates with DB entries
            if (!dbAssets.find(a => a.url === publicUrl)) {
              supabaseAssets.push({
                id: file.id || file.name,
                fileName: file.name,
                url: publicUrl,
                type: 'image/unknown',
                size: (file as any).metadata?.size || 0,
                category: dir,
                createdAt: (file as any).created_at,
                fromStorage: true
              })
            }
          })
        }
      } catch (err) {
        console.warn(`Failed to list dir ${dir}:`, err)
      }
    }))

    // Return union, DB assets first (they have better metadata)
    return NextResponse.json([...dbAssets, ...supabaseAssets])
  } catch (err) {
    console.error('Assets GET Error:', err)
    return NextResponse.json({ error: 'Failed to fetch assets' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

    await prisma.mediaAsset.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (err) {
     return NextResponse.json({ error: 'Failed to delete asset' }, { status: 500 })
  }
}
