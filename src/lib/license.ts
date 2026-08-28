import path from 'node:path'
import { promises as fs } from 'node:fs'
import { cache } from 'react'

/**
 * Single source of truth for the Oxiverse license version.
 * The version lives ONLY in /LICENSE (the "# Oxiverse Community License (OCL) vX.Y" heading).
 * Every page that shows a version reads it from here, so bumping it in /LICENSE
 * updates the entire website automatically.
 *
 * Server-only: uses node:fs. Never import this from a client component directly —
 * read it in a server component and pass the string down as a prop.
 */
export const getOclVersion = cache(async function getOclVersion(): Promise<string> {
  try {
    const licensePath = path.join(process.cwd(), 'LICENSE')
    const text = await fs.readFile(licensePath, 'utf8')
    const match = text.match(/^#\s*Oxiverse Community License \(OCL\)\s+(v\d+\.\d+)/m)
    if (match) return match[1]
  } catch {
    // fall through to default
  }
  return 'v1.2'
})

/** Convenience: full label e.g. "Oxiverse Community License (OCL) v1.2" */
export const getOclVersionLabel = cache(async function getOclVersionLabel(): Promise<string> {
  const v = await getOclVersion()
  return `Oxiverse Community License (OCL) ${v}`
})
