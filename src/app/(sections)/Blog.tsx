import React from 'react'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

export default async function Blog() {
  let blogs: any[] = []
  try {
    blogs = await prisma.blog.findMany({
      where: { published: true },
      include: { author: true, category: true },
      orderBy: { publishedAt: 'desc' },
      take: 4,
    })
  } catch (err) {
    console.error('Blog component fetch fail:', err)
  }

  const formattedBlogs = blogs.map(blog => ({
    id: blog.id,
    slug: blog.slug,
    title: blog.title,
    excerpt: blog.excerpt,
    category: blog.category?.name,
    author: blog.author.name || blog.author.email,
    authorImage: blog.author.image,
    date: formatDate(blog.publishedAt || blog.createdAt),
    image: blog.imageUrl,
    imageDisplay: blog.imageDisplay,
  }))

  return (
    <Section id="blog" className="pt-32 pb-24 bg-primary-900 relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
        <div className="inline-block border-2 border-primary-50 px-3 py-1 mb-6 bg-primary-950">
          <span className="font-mono text-xs uppercase tracking-widest font-bold text-accent-300">Blog</span>
        </div>
        <h2 className="font-display text-[3rem] md:text-[4.5rem] leading-[0.9] text-primary-50 tracking-tighter font-bold uppercase">
          Latest <span className="text-accent-300">Updates.</span>
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {formattedBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {formattedBlogs.map((post) => (
              <Link key={post.id} href={post.slug === '#' ? '#' : `/blog/${post.slug}`} className="group block">
                <div className="retro-box p-0 h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden bg-primary-900 border-b-2 border-primary-50">
                    {post.image ? (
                      <Image src={post.image} alt={post.title} fill className={`object-${post.imageDisplay || 'cover'} transition-transform duration-500 group-hover:scale-105`} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary-900">
                        <span className="text-primary-600 font-display text-5xl font-bold">O</span>
                      </div>
                    )}
                    {post.category && (
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 bg-primary-950 text-primary-50 border-2 border-primary-50 font-mono">{post.category}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1 bg-primary-800">
                    <h3 className="text-base font-display text-primary-50 mb-3 line-clamp-2 group-hover:text-accent-300 transition-colors font-bold uppercase">{post.title}</h3>
                    <p className="text-primary-300 text-sm mb-6 line-clamp-3 flex-1 leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-[10px] font-bold text-primary-400 uppercase tracking-widest pt-4 border-t-2 border-primary-700 font-mono">
                      <span>{post.author}</span>
                      <span>{post.date}</span>
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
              <p className="text-primary-300 text-lg font-display uppercase">No posts published yet.</p>
            </div>
          </div>
        )}
        <div className="text-center mt-12">
          <Button href="/blog">All Posts</Button>
        </div>
      </div>
    </Section>
  )
}
