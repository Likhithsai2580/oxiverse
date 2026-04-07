import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'

export default async function Research() {
  let papers: any[] = []
  try {
    papers = await prisma.researchPaper.findMany({
      where: { published: true },
      include: { author: true, category: true },
      orderBy: { publishedAt: 'desc' },
      take: 2,
    })
  } catch (err) {
    console.error('Research component fetch fail:', err)
  }

  const formattedPapers = papers.map(paper => ({
    slug: paper.slug,
    title: paper.title,
    excerpt: paper.abstract,
    category: paper.category?.name,
    author: paper.author.name || paper.author.email,
    authorImage: paper.author.image,
    date: formatDate(paper.publishedAt || paper.createdAt),
    image: paper.imageUrl,
    imageDisplay: paper.imageDisplay,
  }))

  return (
    <Section id="research" className="py-24 bg-primary-800 relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
        <div className="inline-block border-2 border-primary-50 px-3 py-1 mb-6 bg-primary-950">
          <span className="font-mono text-xs uppercase tracking-widest font-bold text-accent-300">Research</span>
        </div>
        <h2 className="font-display text-[3rem] md:text-[4.5rem] leading-[0.9] text-primary-50 tracking-tighter font-bold uppercase">
          Technical <span className="text-accent-300">Deep Dives.</span>
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {formattedPapers.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {formattedPapers.map((paper, index) => (
              <Link key={index} href={paper.slug === '#' ? '#' : `/research/${paper.slug}`} className="group block">
                <div className="retro-box p-0 h-full overflow-hidden flex flex-col md:flex-row">
                  {paper.image ? (
                    <div className="w-full md:w-48 h-48 flex-shrink-0 bg-primary-900 flex items-center justify-center overflow-hidden border-b-2 md:border-b-0 md:border-r-2 border-primary-50 p-3">
                      <img src={paper.image} alt={paper.title} className={`w-full h-full object-${paper.imageDisplay || 'contain'} transition-transform duration-500 group-hover:scale-105`} />
                    </div>
                  ) : (
                    <div className="w-full md:w-48 h-48 flex-shrink-0 bg-primary-900 flex items-center justify-center border-b-2 md:border-b-0 md:border-r-2 border-primary-50">
                      <svg className="w-10 h-10 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  )}
                  <div className="flex-1 p-8 flex flex-col bg-primary-800">
                    <div className="flex items-center gap-3 mb-4">
                      {paper.category && (
                        <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 border-2 border-accent-300 text-accent-300 font-mono">{paper.category}</span>
                      )}
                      <span className="text-[10px] font-bold text-primary-400 uppercase tracking-widest font-mono">{paper.date}</span>
                    </div>
                    <h3 className="text-xl font-display text-primary-50 mb-3 group-hover:text-accent-300 transition-colors font-bold uppercase tracking-tight">{paper.title}</h3>
                    <p className="text-primary-300 text-sm mb-6 line-clamp-3 leading-relaxed">{paper.excerpt}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-xs font-mono text-primary-400">{paper.author}</span>
                      <span className="text-accent-300 group-hover:translate-x-2 transition-transform font-mono">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="retro-box p-0">
            <div className="retro-header-bar"><span>NO_DATA</span></div>
            <div className="p-12 text-center bg-primary-800">
              <p className="text-primary-300 text-lg font-display uppercase">No research published yet.</p>
            </div>
          </div>
        )}
        <div className="text-center mt-12">
          <Button href="/research">Research Archive</Button>
        </div>
      </div>
    </Section>
  )
}
