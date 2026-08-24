import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import fs from 'fs/promises'
import path from 'path'
import { requireAdmin } from '@/lib/auth'

const filePath = path.join(process.cwd(), 'src/data/roadmap.json')

export async function GET() {
  try {
    // 1. Try reading from Supabase DB via Prisma
    if ((prisma as any).roadmapPhase) {
      try {
        const dbPhases = await (prisma as any).roadmapPhase.findMany({
          orderBy: { order: 'asc' },
        })
        if (dbPhases && dbPhases.length > 0) {
          return NextResponse.json(
            dbPhases.map((p: any) => ({
              id: p.id,
              phase: p.phase,
              title: p.title,
              status: p.status,
              isLocked: p.isLocked,
              blurIntensity: p.blurIntensity,
              items: typeof p.items === 'string' ? JSON.parse(p.items) : p.items,
            }))
          )
        }
      } catch (dbErr) {
        console.warn('Roadmap database query fallback to JSON:', dbErr)
      }
    }

    // 2. Fallback to roadmap.json file
    const data = await fs.readFile(filePath, 'utf8')
    return NextResponse.json(JSON.parse(data))
  } catch (error) {
    console.error('Error reading roadmap data:', error)
    return NextResponse.json({ error: 'Failed to read roadmap data' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const guard = await requireAdmin()
  if (guard) return guard
  try {
    const body = await request.json()

    // 1. Always sync to JSON file backup
    try {
      await fs.writeFile(filePath, JSON.stringify(body, null, 2), 'utf8')
    } catch (fsErr) {
      console.warn('JSON file backup write failed:', fsErr)
    }

    // 2. Sync to Supabase DB via Prisma if table exists
    if ((prisma as any).roadmapPhase && Array.isArray(body)) {
      try {
        await (prisma as any).$transaction(async (tx: any) => {
          await tx.roadmapPhase.deleteMany()
          await tx.roadmapPhase.createMany({
            data: body.map((phase: any, index: number) => ({
              phase: phase.phase || `Phase ${index + 1}`,
              title: phase.title || '',
              status: phase.status || 'future',
              isLocked: Boolean(phase.isLocked),
              blurIntensity: parseInt(phase.blurIntensity, 10) || 0,
              items: phase.items || [],
              order: index,
            })),
          })
        })
      } catch (dbErr) {
        console.warn('Roadmap database transaction skipped/fallback:', dbErr)
      }
    }

    return NextResponse.json({ message: 'Roadmap updated successfully' })
  } catch (error) {
    console.error('Error updating roadmap data:', error)
    return NextResponse.json({ error: 'Failed to update roadmap data' }, { status: 500 })
  }
}
