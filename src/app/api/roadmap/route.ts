import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const filePath = path.join(process.cwd(), 'src/data/roadmap.json')

export async function GET() {
  try {
    const data = await fs.readFile(filePath, 'utf8')
    return NextResponse.json(JSON.parse(data))
  } catch (error) {
    console.error('Error reading roadmap data:', error)
    return NextResponse.json({ error: 'Failed to read roadmap data' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    await fs.writeFile(filePath, JSON.stringify(body, null, 2), 'utf8')
    return NextResponse.json({ message: 'Roadmap updated successfully' })
  } catch (error) {
    console.error('Error updating roadmap data:', error)
    return NextResponse.json({ error: 'Failed to update roadmap data' }, { status: 500 })
  }
}
