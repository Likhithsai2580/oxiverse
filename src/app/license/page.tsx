import React from 'react'
import { Metadata } from 'next'
import path from 'node:path'
import { promises as fs } from 'node:fs'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const metadata: Metadata = {
  title: 'OCL License | Oxiverse',
  description: 'Oxiverse Community License (OCL). Source-available, privacy-by-design, with paid closed-source self-hosting and free full-source self-hosting paths (OCL or OSI-approved open source).',
  alternates: {
    canonical: '/license',
  },
}

// Single source of truth: render the /LICENSE file (markdown) at request time.
// Edits to /LICENSE are reflected here automatically — keep the license text ONLY in /LICENSE.
async function getLicenseMarkdown(): Promise<string> {
  const licensePath = path.join(process.cwd(), 'LICENSE')
  return fs.readFile(licensePath, 'utf8')
}

export default async function LicensePage() {
  const markdown = await getLicenseMarkdown()

  return (
    <main className="min-h-screen bg-primary-800 retro-bg selection:bg-accent-300 selection:text-primary-950">
      <Navigation />
      <div className="pt-32 pb-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black font-display text-primary-50 mb-6 uppercase tracking-tighter">
            OCL <span className="text-accent-300 font-outline-2">License</span>
          </h1>
          <div className="h-2 w-24 bg-accent-300 shadow-retro-sm mb-10" />
          <article
            className="prose prose-invert prose-primary max-w-none font-mono text-primary-100
              prose-headings:font-display prose-headings:uppercase prose-headings:tracking-widest
              prose-h2:text-2xl prose-h2:text-accent-300 prose-h2:border-b prose-h2:border-primary-700 prose-h2:pb-2
              prose-h3:text-primary-100 prose-h3:font-display prose-h3:uppercase prose-h3:tracking-wide
              prose-p:text-primary-200 prose-p:leading-loose
              prose-strong:text-primary-50 prose-strong:font-bold
              prose-a:text-accent-300 prose-a:no-underline hover:prose-a:underline
              prose-ul:list-square prose-li:marker:text-accent-300
              prose-blockquote:border-l-4 prose-blockquote:border-accent-300/50 prose-blockquote:bg-primary-800/30 prose-blockquote:px-4"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
          </article>
          <div className="p-6 border-2 border-accent-300/30 bg-primary-900/50 mt-16 shadow-retro-md text-sm">
            <p className="m-0">
              For licensing inquiries: <a href="mailto:likhith@oxiverse.com" className="text-accent-300 hover:text-primary-50">likhith@oxiverse.com</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
