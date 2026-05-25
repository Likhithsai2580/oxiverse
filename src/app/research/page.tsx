import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Section, SectionHeader, Card } from '@/components/ui'
import { formatDate } from '@/lib/utils'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import * as motion from 'framer-motion/client'

export const revalidate = 60

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Oxiverse Research',
  description: 'Research papers and publications from the Oxiverse team',
  publisher: {
    '@type': 'Organization',
    name: 'Oxiverse',
    logo: {
      '@type': 'ImageObject',
      url: 'https://oxiverse.com/favicon-256x256.png'
    }
  }
}


export const metadata: Metadata = {
  title: 'Research - Oxiverse',
  description: 'Research papers and publications from the Oxiverse team',
  alternates: {
    canonical: '/research',
  },
  openGraph: {
    title: 'Research - Oxiverse',
    description: 'Research papers and publications from the Oxiverse team',
    type: 'website',
    url: 'https://oxiverse.com/research',
  },
}

export default async function ResearchPage() {
  const papers = await prisma.researchPaper.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  })

  return (
    <main className="min-h-screen bg-transparent pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <Section id="research">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            title="Research"
            subtitle="Publications and research papers from Oxiverse Labs"
          />
        </motion.div>

        {papers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-dark-400">No research papers yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {papers.map((paper, index) => (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/research/${paper.slug}`} className="group block">
                  <Card className="hover:border-accent-500/50 transition-all duration-300 p-0 overflow-hidden bg-white/[0.02] hover:bg-white/[0.04]">
                    <div className="flex flex-col md:flex-row gap-0">
                      {paper.imageUrl ? (
                        <div className="w-full md:w-64 h-48 relative overflow-hidden">
                          <Image
                            src={paper.imageUrl}
                            alt={paper.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 256px"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            priority={index < 2}
                          />
                        </div>
                      ) : (
                        <div className="w-full md:w-64 h-48 bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center">
                          <svg className="w-12 h-12 text-dark-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                      )}

                      <div className="flex-1 p-6 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[10px] font-black text-accent-400 uppercase tracking-widest bg-accent-500/10 px-2 py-0.5 rounded">
                            Paper
                          </span>
                          <span className="text-[10px] text-dark-500 font-medium">
                            {formatDate(paper.publishedAt || paper.createdAt)}
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent-400 transition-colors">
                          {paper.title}
                        </h3>

                        {paper.abstract && (
                          <p className="text-dark-400 text-sm line-clamp-2 mb-4 leading-relaxed max-w-2xl">
                            {paper.abstract}
                          </p>
                        )}

                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full overflow-hidden relative">
                              <Image
                                src="https://avatars.githubusercontent.com/u/254577690?v=4"
                                alt="Likhith"
                                fill
                                sizes="20px"
                                className="object-cover"
                              />
                            </div>
                            <span className="text-xs font-medium text-dark-300">
                              {paper.author.name || paper.author.email}
                            </span>
                          </div>

                          <div className="flex items-center gap-4">
                            {paper.pdfUrl && (
                              <span className="flex items-center text-[10px] font-bold text-primary-400 uppercase tracking-tight">
                                <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                PDF AVAILABLE
                              </span>
                            )}
                            <svg className="w-5 h-5 text-dark-500 group-hover:text-accent-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </div>
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
