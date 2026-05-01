import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const filePath = path.join(process.cwd(), 'src/data/announcement.json')

export async function GET() {
  try {
    const data = await fs.readFile(filePath, 'utf8')
    return NextResponse.json(JSON.parse(data))
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return NextResponse.json({ active: false, message: '', link: '', linkText: '' })
    }
    console.error('Error reading announcement data:', error)
    return NextResponse.json({ error: 'Failed to read announcement data' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // ensure directory exists
    await fs.mkdir(path.dirname(filePath), { recursive: true })
    await fs.writeFile(filePath, JSON.stringify(body, null, 2), 'utf8')
    return NextResponse.json({ message: 'Announcement updated successfully' })
  } catch (error) {
    console.error('Error updating announcement data:', error)
    return NextResponse.json({ error: 'Failed to update announcement data' }, { status: 500 })
  }
}
