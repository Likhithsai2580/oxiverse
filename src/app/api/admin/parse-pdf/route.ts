import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import pdfParse from 'pdf-parse'
import { requireAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

function cleanPdfTextToMarkdown(rawText: string): { title: string; abstract: string; markdown: string } {
  const lines = rawText.split(/\r?\n/)
  const cleanedLines: string[] = []
  let detectedTitle = ''
  let detectedAbstract = ''

  let inAbstract = false
  let abstractLines: string[] = []

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim()

    // Skip empty lines
    if (!line) {
      if (cleanedLines.length > 0 && cleanedLines[cleanedLines.length - 1] !== '') {
        cleanedLines.push('')
      }
      continue
    }

    // Skip standalone page numbers or headers
    if (/^(page\s+)?\d+(\s+of\s+\d+)?$/i.test(line) || /^\d+\s*\/\s*\d+$/.test(line)) {
      continue
    }

    // Capture first prominent line as title if not set
    if (!detectedTitle && line.length > 3 && line.length < 150 && !line.startsWith('#')) {
      detectedTitle = line.replace(/^[#\s]+/, '').trim()
    }

    // Detect Abstract section
    if (/^(abstract|executive summary)[:\s]*$/i.test(line) || /^abstract[:\s]/i.test(line)) {
      inAbstract = true
      cleanedLines.push(`## ${line.toUpperCase()}`)
      const rest = line.replace(/^(abstract|executive summary)[:\s]*/i, '').trim()
      if (rest) abstractLines.push(rest)
      continue
    }

    if (inAbstract) {
      if (/^(1\.|\d+\.|\b(introduction|background|methodology|overview)\b)/i.test(line)) {
        inAbstract = false
        detectedAbstract = abstractLines.join(' ').trim()
      } else {
        abstractLines.push(line)
      }
    }

    // Convert Numbered/Named Section Headings into Markdown ## / ###
    if (/^(\d+(\.\d+)*)\s+[A-Z][A-Za-z0-9\s—–:-]{2,80}$/.test(line)) {
      cleanedLines.push('')
      const level = line.split('.')[0] ? '##' : '###'
      cleanedLines.push(`${level} ${line}`)
      cleanedLines.push('')
      continue
    }

    // Convert ALL CAPS headings
    if (/^[A-Z0-9\s—–:-]{4,60}$/.test(line) && !line.includes('.') && line.length < 60) {
      cleanedLines.push('')
      cleanedLines.push(`## ${line}`)
      cleanedLines.push('')
      continue
    }

    // Convert Bullet points
    if (/^[•*▪►-]\s+/.test(line)) {
      cleanedLines.push(line.replace(/^[•*▪►-]\s+/, '- '))
      continue
    }

    // Convert Numbered lists
    if (/^\d+\)\s+/.test(line) || /^\(\d+\)\s+/.test(line)) {
      cleanedLines.push(line.replace(/^(\d+\)|\(\d+\))\s+/, '1. '))
      continue
    }

    // Fix hyphenated line wraps (e.g., "distrib- \n uted" -> "distributed")
    if (cleanedLines.length > 0 && cleanedLines[cleanedLines.length - 1].endsWith('-')) {
      const prev = cleanedLines.pop()!
      cleanedLines.push(prev.slice(0, -1) + line)
      continue
    }

    cleanedLines.push(line)
  }

  if (inAbstract && !detectedAbstract) {
    detectedAbstract = abstractLines.join(' ').trim()
  }

  // Join lines with proper paragraph handling
  let formattedMarkdown = ''
  for (let i = 0; i < cleanedLines.length; i++) {
    const current = cleanedLines[i]
    if (current.startsWith('#') || current.startsWith('- ') || current.startsWith('1. ') || current === '') {
      formattedMarkdown += `${current}\n`
    } else {
      const next = cleanedLines[i + 1]
      if (next && next !== '' && !next.startsWith('#') && !next.startsWith('- ') && !next.startsWith('1. ')) {
        formattedMarkdown += `${current} `
      } else {
        formattedMarkdown += `${current}\n\n`
      }
    }
  }

  return {
    title: detectedTitle,
    abstract: detectedAbstract.slice(0, 500),
    markdown: formattedMarkdown.trim(),
  }
}

export async function POST(request: NextRequest) {
  const guard = await requireAdmin()
  if (guard) return guard
  try {

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are supported' }, { status: 400 })
    }

    // 15MB limit for PDF processing
    if (file.size > 15 * 1024 * 1024) {
      return NextResponse.json({ error: 'PDF file size exceeds 15MB limit' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const parsed = await pdfParse(buffer)
    const { title, abstract, markdown } = cleanPdfTextToMarkdown(parsed.text)

    return NextResponse.json({
      success: true,
      title: title || file.name.replace(/\.pdf$/i, ''),
      abstract,
      markdown,
      pageCount: parsed.numpages,
      info: parsed.info || {},
    })
  } catch (error: any) {
    console.error('Error parsing PDF:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to parse PDF document into Markdown' },
      { status: 500 }
    )
  }
}
