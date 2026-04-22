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
                id: `${dir}/${file.name}`,
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

    // 1. Try to find in DB
    const dbAsset = await prisma.mediaAsset.findUnique({
      where: { id }
    })

    let storagePath: string | null = null

    if (dbAsset) {
      // Extract path from Supabase URL
      if (dbAsset.url.includes('supabase.co/storage/v1/object/public/images/')) {
        storagePath = dbAsset.url.split('/public/images/')[1]
      }
      
      // Delete from DB
      await prisma.mediaAsset.delete({
        where: { id }
      })
    } else {
      // If not in DB, the ID itself might be the storage path (dir/name)
      if (id.includes('/')) {
        storagePath = id
      }
    }

    // 2. Delete from Supabase Storage
    if (storagePath) {
      const { data, error } = await supabaseAdmin.storage.from('images').remove([storagePath])
      if (error) console.error('Storage deletion error:', error)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Assets DELETE Error:', err)
    return NextResponse.json({ error: 'Failed to delete asset' }, { status: 500 })
  }
}


