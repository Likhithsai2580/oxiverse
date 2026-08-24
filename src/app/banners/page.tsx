import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Banners | Oxiverse',
  description: 'Current announcements and notices across the Oxiverse ecosystem.',
  alternates: {
    canonical: '/banners',
  },
}

export default async function BannersIndexPage() {
  const now = new Date()
  const banners = await prisma.banner.findMany({
    where: {
      active: true,
      OR: [{ startAt: null }, { startAt: { lte: now } }],
    },
    orderBy: [{ placement: 'asc' }, { order: 'asc' }, { createdAt: 'desc' }],
  })

  const activeBanners = banners.filter((b) => !b.endAt || b.endAt >= now)

  const placements: { key: string; label: string }[] = [
    { key: 'announcement', label: 'Announcements' },
    { key: 'hero', label: 'Hero Notices' },
    { key: 'section', label: 'Section Banners' },
  ]

  return (
    <main className="min-h-screen bg-dark-950 pt-20">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="border-b border-dark-700 pb-10 mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
            Banners
          </h1>
          <p className="text-xl text-dark-400 font-light leading-relaxed">
            Current announcements and notices across the Oxiverse ecosystem.
          </p>
        </header>

        {activeBanners.length === 0 ? (
          <p className="text-dark-400">No banners are currently active.</p>
        ) : (
          <div className="space-y-12">
            {placements.map((placement) => {
              const items = activeBanners.filter((b) => b.placement === placement.key)
              if (items.length === 0) return null
              return (
                <section key={placement.key}>
                  <h2 className="text-lg font-bold text-primary-400 mb-4 uppercase tracking-widest text-sm">
                    {placement.label}
                  </h2>
                  <div className="grid grid-cols-1 gap-6">
                    {items.map((banner) => (
                      <div key={banner.id}>
                        <div className="bg-white/5 border border-white/10 p-6 hover:border-primary-500/50 transition-colors">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-bold text-white mb-2">{banner.title}</h3>
                              {banner.message && (
                                <p className="text-dark-400 text-sm leading-relaxed">{banner.message}</p>
                              )}
                            </div>
                            {banner.imageUrl && (
                              <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg bg-dark-900">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={banner.imageUrl}
                                  alt={banner.title}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              </div>
                            )}
                          </div>
                          {banner.link && (
                            <Link
                              href={banner.link}
                              target={banner.link.startsWith('http') ? '_blank' : undefined}
                              rel={banner.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="inline-flex items-center gap-2 mt-4 text-sm font-bold text-primary-400 hover:text-primary-300 transition-colors"
                            >
                              {banner.linkText || 'Learn more'}
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}