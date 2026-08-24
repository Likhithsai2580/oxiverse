import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Pages | Oxiverse',
  description: 'Explore pages across the Oxiverse ecosystem.',
  alternates: {
    canonical: '/pages',
  },
}

export default async function PagesIndexPage() {
  const pages = await prisma.cmsPage.findMany({
    where: { published: true, parentId: null },
    orderBy: { order: 'asc' },
    include: {
      children: {
        where: { published: true },
        orderBy: { order: 'asc' },
        select: { title: true, slug: true, excerpt: true },
      },
    },
  })

  return (
    <main className="min-h-screen bg-dark-950 pt-20">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="border-b border-dark-700 pb-10 mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
            Pages
          </h1>
          <p className="text-xl text-dark-400 font-light leading-relaxed">
            A growing library of content across the Oxiverse ecosystem.
          </p>
        </header>

        {pages.length === 0 ? (
          <p className="text-dark-400">No pages published yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {pages.map((page) => (
              <div key={page.id}>
                <Link href={`/pages/${page.slug}`} className="group">
                  <div className="bg-white/5 border border-white/10 p-6 hover:border-primary-500/50 transition-colors">
                    <h2 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                      {page.title}
                    </h2>
                    {page.excerpt && (
                      <p className="text-dark-400 text-sm line-clamp-2">{page.excerpt}</p>
                    )}
                  </div>
                </Link>
                {page.children.length > 0 && (
                  <div className="mt-3 ml-4 pl-4 border-l border-white/10 space-y-2">
                    {page.children.map((child) => (
                      <Link
                        key={child.slug}
                        href={`/pages/${child.slug}`}
                        className="block text-sm text-dark-300 hover:text-primary-400 transition-colors"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}