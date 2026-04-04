import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { formatDate } from '@/lib/utils'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Image from 'next/image'
import * as motion from 'framer-motion/client'

export const dynamic = 'force-dynamic'

interface ResearchPaperPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: ResearchPaperPageProps): Promise<Metadata> {
  const paper = await prisma.researchPaper.findUnique({
    where: { slug: params.slug },
  })

  if (!paper) {
    return {
      title: 'Paper Not Found - Oxiverse',
    }
  }

  return {
    title: `${paper.title} - Oxiverse`,
    description: paper.abstract || `Read ${paper.title} on Oxiverse`,
    openGraph: {
      title: paper.title,
      description: paper.abstract || `Read ${paper.title} on Oxiverse`,
      type: 'article',
      publishedTime: paper.publishedAt?.toISOString(),
      authors: [paper.authorId],
      images: paper.imageUrl ? [{ url: paper.imageUrl }] : [],
    },
  }
}

const MarkdownComponents = {
  img: (props: any) => {
    const isBadge = props.src?.includes('shields.io') || props.src?.includes('badge') || props.alt?.toLowerCase().includes('badge');

    if (isBadge) {
      return <img {...props} className="inline-block mr-2 align-middle" />;
    }

    return (
      <span className="block my-12 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        <img
          {...props}
          className="w-full h-auto object-cover max-h-[600px]"
          loading="lazy"
        />
        {props.alt && (
          <span className="block text-center text-sm text-dark-500 mt-4 italic">
            {props.alt}
          </span>
        )}
      </span>
    );
  },
}

export default async function ResearchPaperPage({ params }: ResearchPaperPageProps) {
  const paper = await prisma.researchPaper.findUnique({
    where: { slug: params.slug },
    include: {
      author: {
        select: { name: true, email: true, image: true },
      },
    },
  }) as any

  if (!paper || !paper.published) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-dark-950 pt-20">
      <Navigation />
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ScholarlyArticle',
              headline: paper.title,
              description: paper.abstract,
              image: paper.imageUrl,
              datePublished: paper.publishedAt || paper.createdAt,
              author: {
                '@type': 'Person',
                name: (paper.author as any).name || (paper.author as any).email,
              },
            }),
          }}
        />
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border-b border-dark-700 pb-12"
        >
          <div className="flex items-center gap-2 mb-6 text-accent-400 text-sm font-medium tracking-wider uppercase">
            <span>Research</span>
            <span>•</span>
            <time dateTime={paper.publishedAt?.toISOString() || paper.createdAt.toISOString()}>
              {formatDate(paper.publishedAt || paper.createdAt)}
            </time>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight leading-tight">
            {paper.title}
          </h1>
          
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-4">
              {paper.imageUrl && (
                <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 shadow-lg overflow-hidden flex items-center justify-center p-1.5 flex-shrink-0">
                  <Image
                    src={paper.imageUrl}
                    alt={paper.title}
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
              )}
              <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20">
                  {(paper.author as any).image ? (
                    <Image
                      src={(paper.author as any).image}
                      alt={(paper.author as any).name || 'Author'}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-dark-700 flex items-center justify-center">
                      <span className="text-xs text-white">{((paper.author as any).name || (paper.author as any).email).charAt(0)}</span>
                    </div>
                  )}
                </div>
                <span className="text-sm font-medium text-dark-200">{(paper.author as any).name || (paper.author as any).email}</span>
              </div>
            </div>

            {paper.pdfUrl && (
              <a
                href={paper.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all hover:scale-105 shadow-lg shadow-primary-500/20"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Paper
              </a>
            )}
          </div>
        </motion.header>

        {/* Abstract */}
        {paper.abstract && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="py-12"
          >
            <div className="p-8 bg-gradient-to-br from-dark-900 to-dark-800 rounded-3xl border border-white/10 shadow-inner">
              <h2 className="text-xs font-bold text-dark-400 uppercase tracking-[0.2em] mb-4">Abstract</h2>
              <p className="text-xl md:text-2xl text-dark-200 font-light leading-relaxed">
                {paper.abstract}
              </p>
            </div>
          </motion.div>
        )}

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="pb-12"
        >
          {paper.content ? (
            <div className="prose prose-invert prose-lg max-w-none 
              prose-p:text-dark-300 prose-p:leading-relaxed
              prose-headings:text-white prose-headings:font-bold
              prose-a:text-primary-400 prose-a:no-underline hover:prose-a:text-primary-300
              prose-strong:text-white prose-code:text-accent-300
              prose-img:rounded-2xl prose-blockquote:border-accent-500
              prose-blockquote:bg-dark-900/50 prose-blockquote:py-1 prose-blockquote:px-6
            ">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={MarkdownComponents}
              >
                {paper.content}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="text-center py-20 bg-dark-900/30 rounded-3xl border border-white/5">
              <svg className="w-16 h-16 text-dark-700 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-dark-400 text-lg">Full research text is currently only available via the PDF download.</p>
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <footer className="border-t border-dark-700 pt-8 mt-12">
          <a href="/research" className="text-primary-400 hover:text-primary-300 text-sm">
            ← Back to all research
          </a>
        </footer>
      </article>
      <Footer />
    </main>
  )
}
