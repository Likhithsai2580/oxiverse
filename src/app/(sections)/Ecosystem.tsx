import React from 'react'
import Section from '@/components/ui/Section'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { Project } from '@prisma/client'
import Button from '@/components/ui/Button'

export default async function Ecosystem() {
  let projects: Project[] = []
  try {
    projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    })
  } catch (err) {
    console.error('Ecosystem component fetch fail:', err)
  }

  return (
    <Section id="ecosystem" className="pt-32 pb-24 bg-primary-800 relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16 text-center">
        <div className="inline-block border-2 border-primary-50 px-3 py-1 mb-6 bg-primary-950">
          <span className="font-mono text-xs uppercase tracking-widest font-bold text-accent-300">Network</span>
        </div>
        <h2 className="font-display text-[3rem] md:text-[4.5rem] leading-[0.9] text-primary-50 tracking-tighter font-bold uppercase">
          The Oxiverse <span className="text-accent-300">Ecosystem</span>
        </h2>
      </div>

      {projects.length > 0 ? (
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div key={project.id} className="retro-box p-0 group">
              <div className="retro-header-bar">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary-950 border border-primary-950" />
                  <span className="truncate">{project.title.toUpperCase()}.EXE</span>
                </div>
                {project.status && (
                  <span className={`font-mono text-[10px] uppercase font-bold tracking-widest ${
                    project.status === 'current' ? 'text-accent-300' : 
                    project.status === 'upcoming' ? 'text-yellow-400' : 
                    'text-primary-400'
                  }`}>
                    [{project.status}]
                  </span>
                )}
              </div>
              <div className="p-6 bg-primary-800 flex flex-col min-h-[220px]">
                <div className="w-14 h-14 bg-primary-900 border-2 border-primary-700 flex items-center justify-center text-primary-50 font-display font-bold text-xl overflow-hidden relative mb-4">
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className={`object-${project.imageDisplay || 'cover'}`}
                    />
                  ) : (
                    project.title.charAt(0)
                  )}
                </div>

                <h3 className="text-xl font-display text-primary-50 mb-2 font-bold uppercase group-hover:text-accent-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-primary-300 text-sm mb-6 flex-1 leading-relaxed">
                  {project.description}
                </p>

                <div className="mt-auto pt-6 flex flex-col gap-3">
                  {project.link && (
                    <Link
                      href={`/docs/${project.slug}`}
                      className="text-xs font-bold font-mono text-primary-400 uppercase tracking-widest flex items-center gap-2 hover:text-accent-300 transition-colors w-fit"
                    >
                      Documentation
                      <span className="text-accent-300 transform group-hover:translate-x-2 transition-transform">→</span>
                    </Link>
                  )}
                  {project.hostedUrl && (
                    <Link
                      href={project.hostedUrl}
                      target="_blank"
                      className="text-xs font-bold font-mono text-accent-500 uppercase tracking-widest flex items-center gap-2 hover:text-accent-300 transition-colors w-fit"
                    >
                      Hosted Version
                      <svg className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="retro-box p-0">
            <div className="retro-header-bar">
              <span>SYSTEM_STATUS</span>
            </div>
            <div className="p-12 text-center bg-primary-800">
              <span className="block text-accent-300 font-mono font-bold text-xs tracking-widest mb-4 uppercase">Migration in Progress</span>
              <p className="text-primary-50 text-xl font-display mb-8 font-bold uppercase">Internal projects are being migrated to the public ecosystem.</p>
              <Button href="https://codeberg.org/itxLikhith" target="_blank" variant="outline">
                Follow Development
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 text-center">
        <Button href="/docs">
          Full Directory
        </Button>
      </div>
    </Section>
  )
}
