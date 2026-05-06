import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Section, SectionHeader, Card } from '@/components/ui'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

export const revalidate = 0 // Keep it dynamic to reflect filesystem changes instantly

interface PageProps {
  params: { slug: string }
  searchParams: { path?: string }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await prisma.project.findUnique({ where: { slug: params.slug } })
  const title = project?.title || params.slug.charAt(0).toUpperCase() + params.slug.slice(1).replace(/-/g, ' ')
  
  return {
    title: `${title} Docs | Oxiverse`,
    description: `Documentation for ${title}`,
    alternates: {
      canonical: `/docs/${params.slug}`,
    },
  }
}

async function getLocalDocs(slug: string) {
  const docsDir = path.join(process.cwd(), 'docs', slug)
  if (!fs.existsSync(docsDir)) return null
  
  const files: { name: string, path: string, group: string | null }[] = []
  
  function walk(dir: string, base: string = '') {
    try {
      const list = fs.readdirSync(dir)
      list.forEach(file => {
        const fullPath = path.join(dir, file)
        const relativePath = path.join(base, file).replace(/\\/g, '/')
        const stat = fs.statSync(fullPath)
        if (stat.isDirectory()) {
          walk(fullPath, relativePath)
        } else if (file.toLowerCase().endsWith('.md')) {
          files.push({
            name: file,
            path: relativePath,
            group: base || null
          })
        }
      })
    } catch (e) {
      console.error(`Error walking directory ${dir}:`, e)
    }
  }
  
  walk(docsDir)
  return files
}

async function getLocalFileContent(slug: string, filePath: string) {
  const docsDir = path.join(process.cwd(), 'docs', slug)
  
  // Variants for the requested file
  const variants = filePath.toLowerCase() === 'readme.md' 
    ? ['README.md', 'readme.md', 'index.md', 'INDEX.md'] 
    : [filePath]

  for (const variant of variants) {
    const fullPath = path.join(docsDir, variant)
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
      try {
        const content = fs.readFileSync(fullPath, 'utf-8')
        return { type: 'file', content, actualPath: variant }
      } catch (e) {
        // Continue to next variant
      }
    }
  }
  return null
}

async function fetchCodebergContent(repoUrl: string, filePath: string = 'README.md') {
  if (!repoUrl) return null
  
  let normalizedUrl = repoUrl.replace('github.com', 'codeberg.org')
  if (!normalizedUrl.startsWith('https://codeberg.org/')) return null
  
  const repoPath = normalizedUrl.replace('https://codeberg.org/', '').replace(/\/$/, '')
  const branches = ['main', 'master']
  
  // Try with 'docs/' prefix first if it's not README.md, then try raw
  const pathsToTry = filePath.toLowerCase() === 'readme.md' 
    ? ['README.md', 'readme.md', 'README.markdown', 'readme.markdown']
    : [`docs/${filePath}`, filePath]

  for (const branch of branches) {
    for (const p of pathsToTry) {
      const rawUrl = `https://codeberg.org/${repoPath}/raw/branch/${branch}/${p}`
      try {
        const res = await fetch(rawUrl, { next: { revalidate: 60 } })
        if (res.ok) {
          const content = await res.text()
          if (content && content.length > 0) return { type: 'file', content }
        }
      } catch (e) {
        // Continue
      }
    }
  }

  return null
}


async function getCodebergFiles(repoUrl: string, dir: string = 'docs') {
    if (!repoUrl) return []
    
    let normalizedUrl = repoUrl.replace('github.com', 'codeberg.org')
    if (!normalizedUrl.startsWith('https://codeberg.org/')) return []
    
    const repoPath = normalizedUrl.replace('https://codeberg.org/', '').replace(/\/$/, '')
    const branches = ['main', 'master']
    
    for (const branch of branches) {
      try {
          const res = await fetch(`https://codeberg.org/api/v1/repos/${repoPath}/git/trees/${branch}?recursive=true`, {
              headers: { 'Accept': 'application/json' },
              next: { revalidate: 60 }
          })
          if (res.ok) {
              const data = await res.json()
              if (data && Array.isArray(data.tree)) {
                return data.tree
                  .filter((item: any) => item.path.startsWith(`${dir}/`) && item.path.toLowerCase().endsWith('.md'))
                  .map((item: any) => {
                    const relativePath = item.path.replace(`${dir}/`, '')
                    const parts = relativePath.split('/')
                    return {
                      name: parts.pop(),
                      path: relativePath,
                      group: parts.length > 0 ? parts[0] : null
                    }
                  })
              }
          }
      } catch (e) {
          console.error(`Error fetching trees for ${repoPath}/${branch}:`, e)
      }
    }
    return []
}

export default async function ProjectDocsPage({ params, searchParams }: PageProps) {
  const dbProject = await prisma.project.findUnique({ where: { slug: params.slug } })
  
  // Check if we have local docs even if not in DB
  const localDocs = await getLocalDocs(params.slug)
  
  if (!dbProject && (!localDocs || localDocs.length === 0)) {
    notFound()
  }

  // Create virtual project if missing from DB
  const project = dbProject || {
    title: params.slug.charAt(0).toUpperCase() + params.slug.slice(1).replace(/-/g, ' '),
    slug: params.slug,
    link: null,
    imageUrl: null
  }

  const currentPath = searchParams.path || 'README.md'
  
  // Content Resolution Priority:
  // 1. Local Filesystem
  // 2. Codeberg Repository
  let fileData = await getLocalFileContent(params.slug, currentPath)
  if (!fileData && project.link) {
    fileData = await fetchCodebergContent(project.link, currentPath)
  }

  // Sidebar File List Resolution:
  // 1. Local Filesystem
  // 2. Codeberg Repository (if no local files found)
  let docsFiles = localDocs
  let isLocal = !!(localDocs && localDocs.length > 0)

  if (!isLocal && project.link) {
    docsFiles = await getCodebergFiles(project.link, 'docs')
  }

  // Group files by directory
  const groups: Record<string, any[]> = {}
  docsFiles?.forEach((file: any) => {
    const groupName = file.group || 'General'
    if (!groups[groupName]) groups[groupName] = []
    groups[groupName].push(file)
  })

  return (
    <main className="min-h-screen bg-transparent pt-20">
      <Navigation />
      <Section id="docs-viewer" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="sticky top-28 space-y-8">
              <div>
                <Link href="/docs" className="group text-primary-400 hover:text-primary-300 text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-8 transition-all">
                  <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  All Projects
                </Link>
                
                <div className="flex items-center gap-3 mb-8">
                   <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-400 font-bold border border-primary-500/20">
                      {project.title.charAt(0)}
                   </div>
                   <div>
                      <h2 className="text-white font-bold text-lg leading-tight">{project.title}</h2>
                      <p className="text-[10px] text-dark-500 uppercase tracking-tighter font-bold">
                        {isLocal ? 'Local Documentation' : 'Repository Mirror'}
                      </p>
                   </div>
                </div>

                <nav className="space-y-6">
                  <div>
                    <Link 
                      href={`/docs/${project.slug}`}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${currentPath.toLowerCase() === 'readme.md' ? 'bg-primary-500/10 text-primary-400 font-bold border border-primary-500/20' : 'text-dark-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Introduction
                    </Link>
                  </div>

                  {Object.entries(groups).sort(([a], [b]) => a === 'General' ? -1 : b === 'General' ? 1 : a.localeCompare(b)).map(([group, files]) => (
                    <div key={group} className="space-y-2">
                      <h3 className="px-3 text-[10px] font-bold text-dark-500 uppercase tracking-[0.2em] mb-2">{group.replace('-', ' ')}</h3>
                      <div className="space-y-1">
                        {files.filter(f => f.name.toLowerCase() !== 'readme.md' && f.name.toLowerCase() !== 'index.md').map((file) => (
                          <Link 
                            key={file.path}
                            href={`/docs/${project.slug}?path=${file.path}`}
                            className={`block px-3 py-2 rounded-lg text-sm transition-all border ${currentPath === file.path ? 'bg-primary-500/10 text-primary-400 font-bold border-primary-500/20' : 'text-dark-400 hover:text-white hover:bg-white/5 border-transparent'}`}
                          >
                            {file.name.replace('.md', '').replaceAll('-', ' ').replaceAll('_', ' ').replace(/^\w/, (c: string) => c.toUpperCase())}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </nav>

                {project.link && (
                  <div className="mt-8 pt-8 border-t border-white/5">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary-500/30 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-dark-400 group-hover:text-primary-400 transition-colors">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.996 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.084 18.257l2.124-7.854 2.124 7.854h-4.248zm6.541 0l-2.022-7.464 2.022-3.829 4.341 11.293h-4.341z" /></svg>
                        </div>
                        <span className="text-[10px] font-bold text-dark-400 uppercase tracking-widest group-hover:text-white transition-colors">Source Code</span>
                      </div>
                      <svg className="w-4 h-4 text-dark-600 group-hover:text-primary-400 transition-all transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <Card className="prose prose-invert prose-primary max-w-none bg-[#0a0a0b]/40 backdrop-blur-xl border-white/5 p-8 sm:p-16 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-500/5 rounded-full blur-3xl" />
              
              {fileData?.type === 'file' ? (
                <div className="relative z-10">
                  <div className="mb-12 flex items-center gap-4 text-dark-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                    <span>Docs</span>
                    <span className="w-1 h-1 rounded-full bg-dark-700" />
                    <span>{project.title}</span>
                    <span className="w-1 h-1 rounded-full bg-dark-700" />
                    <span className="text-primary-400/80">{currentPath.split('/').pop()?.replace('.md', '').replaceAll('-', ' ')}</span>
                  </div>
                  
                  <article className="markdown-body">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: ({ node, ...props }) => {
                          const href = props.href || ''
                          const isInternal = href.startsWith('docs/') || href.endsWith('.md') || href.startsWith('./') || (!href.startsWith('http') && !href.startsWith('#'))
                          
                          if (isInternal) {
                            // Clean up the path
                            let cleanPath = href.replace(/^docs\//, '').replace(/^\.\//, '')
                            // If it's just a folder name like 'reference', we might want to handle it, 
                            // but for now let's assume it's a file or needs to be handled by the current logic
                            
                            return (
                              <Link 
                                href={`/docs/${project.slug}?path=${cleanPath}`}
                                className="text-primary-400 hover:text-primary-300 underline underline-offset-4 decoration-primary-400/30 transition-all"
                              >
                                {props.children}
                              </Link>
                            )
                          }
                          
                          return (
                            <a 
                              {...props} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-primary-400 hover:text-primary-300 transition-colors inline-flex items-center gap-1"
                            >
                              {props.children}
                              {!href.startsWith('#') && (
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              )}
                            </a>
                          )
                        }
                      }}
                    >
                      {fileData.content}
                    </ReactMarkdown>
                  </article>

                </div>
              ) : (
                <div className="relative z-10 text-center py-32">
                   <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mx-auto mb-8 text-dark-600 border border-white/5">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Page Not Found</h3>
                    <p className="text-dark-400 max-w-xs mx-auto">The requested documentation file could not be located in the local storage or remote repository.</p>
                    <Link href={`/docs/${project.slug}`} className="mt-8 inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-bold text-sm transition-colors">
                      Return to Introduction
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                </div>
              )}
            </Card>
          </div>

        </div>
      </Section>
      <Footer />
    </main>
  )
}
