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
  '@type': 'Blog',
  name: 'Oxiverse Blog',
  description: 'Latest updates, tutorials, and insights from the Oxiverse team',
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
  title: 'Blog - Oxiverse',
  description: 'Latest updates, tutorials, and insights from the Oxiverse team',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog - Oxiverse',
    description: 'Latest updates, tutorials, and insights from the Oxiverse team',
    type: 'website',
    url: 'https://oxiverse.com/blog',
  },
}

export default async function BlogPage() {
  const blogs = await prisma.blog.findMany({
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
      <Section id="blog">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            title="Blog"
            subtitle="Latest updates, tutorials, and insights"
          />
        </motion.div>

        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-dark-400">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/blog/${blog.slug}`} className="group block h-full">
                  <Card className="h-full overflow-hidden border-white/5 hover:border-primary-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/10 flex flex-col p-0">
                    {blog.imageUrl ? (
                      <div className="aspect-video relative overflow-hidden">
                          <Image
                            src={blog.imageUrl}
                            alt={blog.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            priority={index < 2}
                          />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center">
                        <span className="text-dark-600 font-bold text-4xl">O</span>
                      </div>
                    )}
                    
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3 text-[10px] font-bold text-primary-400 uppercase tracking-widest">
                        <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-primary-400 transition-colors">
                        {blog.title}
                      </h3>
                      
                      {blog.excerpt && (
                        <p className="text-dark-400 text-sm mb-6 line-clamp-3 flex-1 leading-relaxed">
                          {blog.excerpt}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                        <div className="w-6 h-6 rounded-full overflow-hidden relative">
                          <Image
                            src="https://avatars.githubusercontent.com/u/254577690?v=4"
                            alt="Likhith"
                            fill
                            sizes="24px"
                            className="object-cover"
                          />
                        </div>
                        <span className="text-[11px] font-medium text-dark-300">
                          {blog.author.name || blog.author.email}
                        </span>
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
