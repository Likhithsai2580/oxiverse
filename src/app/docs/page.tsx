import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import Link from 'next/link'
import { Section, SectionHeader, Card } from '@/components/ui'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import * as motion from 'framer-motion/client'
import Image from 'next/image'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Docs - Oxiverse Ecosystem',
  description: 'Documentation for all Oxiverse ecosystem products and projects.',
}

export default async function DocsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main className="min-h-screen bg-transparent pt-20">
      <Navigation />
      <Section id="docs-list">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            title="Ecosystem Documentation"
            subtitle="Explore technical guides and READMEs for Oxiverse products"
            badge="Docs Hub"
          />
        </motion.div>

        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-dark-400">No projects found in the ecosystem yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/docs/${project.slug}`} className="group block h-full">
                  <Card className="h-full hover:border-primary-500/50 transition-all duration-300 bg-white/[0.02] border-white/5 p-8 flex flex-col">
                    <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-400 font-bold mb-6 border border-primary-500/20">
                       {project.imageUrl ? (
                        <div className="relative w-full h-full p-2">
                           <Image 
                            src={project.imageUrl} 
                            alt={project.title} 
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        project.title.charAt(0)
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-dark-400 text-sm line-clamp-3 mb-6 flex-1">
                      {project.description}
                    </p>
                    <div className="text-xs font-bold text-primary-400 uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                      Browse Docs
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </Section>
      <Footer />
    </main>
  )
}
