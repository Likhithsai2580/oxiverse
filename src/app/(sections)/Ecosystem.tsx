import React from 'react'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { Project } from '@prisma/client'

export default async function Ecosystem() {
  let projects: Project[] = []
  try {
    projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      take: 6,
    })
  } catch (err) {
    console.error('Ecosystem component fetch fail:', err)
  }

  return (
    <Section id="ecosystem" dark>
      <SectionHeader
        badge="Ecosystem"
        title="The Oxiverse Network"
        subtitle="Explore the growing ecosystem of products and projects built on our privacy-first infrastructure."
      />
      
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="group hover:border-primary-500/50 transition-all duration-300 bg-white/[0.02] border-white/5">
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/10 flex items-center justify-center text-primary-400 font-bold text-xl overflow-hidden relative border border-white/5">
                    {project.imageUrl ? (
                      <Image 
                        src={project.imageUrl} 
                        alt={project.title} 
                        fill
                        className={`object-${project.imageDisplay || 'cover'} ${project.imageDisplay === 'contain' ? 'p-2' : ''}`}
                      />
                    ) : (
                      project.title.charAt(0)
                    )}
                  </div>
                  {project.status && (
                    <Badge variant={project.status === 'current' ? 'success' : 'default'} size="sm" className="capitalize">
                      {project.status}
                    </Badge>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-dark-400 text-sm mb-6 flex-1 leading-relaxed">
                  {project.description}
                </p>
                
                {project.link && (
                  <div className="mt-auto">
                    <Link 
                      href={`/docs/${project.slug}`}
                      className="text-xs font-bold text-primary-400 uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all"
                    >
                      View Documentation
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <Card className="text-center py-20 bg-dark-900/40 border-dashed border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6 text-dark-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <p className="text-dark-400 text-xl font-medium mb-2">Expansion in Progress</p>
              <p className="text-dark-500 text-sm mb-8">Our internal projects are being migrated to the public ecosystem. Check back soon for the next wave of privacy tools.</p>
              <Button href="https://github.com/itxLikhith" target="_blank" variant="outline" size="sm" className="glass">
                Follow Development 
              </Button>
            </div>
          </Card>
        </div>
      )}

      <div className="text-center mt-12">
        <Button href="/docs" variant="outline" className="glass">
          Explore Full Ecosystem Docs
        </Button>
      </div>
    </Section>
  )
}
