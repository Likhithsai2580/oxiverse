import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { formatDate, calculateReadingTime } from '@/lib/utils'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Image from 'next/image'
import * as motion from 'framer-motion/client'
import Link from 'next/link'

export const revalidate = 60

interface BlogPostPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = await prisma.blog.findMany({
    where: { published: true },
    select: { slug: true },
  })
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const blog = await prisma.blog.findUnique({
    where: { slug: params.slug },
  })

  if (!blog) {
    return {
      title: 'Post Not Found - Oxiverse',
    }
  }

  return {
    title: `${blog.title} - Oxiverse`,
    description: blog.excerpt || `Read ${blog.title} on Oxiverse`,
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt || `Read ${blog.title} on Oxiverse`,
      type: 'article',
      publishedTime: blog.publishedAt?.toISOString(),
      authors: [blog.authorId],
      images: blog.imageUrl ? [{ url: blog.imageUrl }] : [],
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
      <span className="block my-12 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative w-full aspect-video">
        <Image
          src={props.src}
          alt={props.alt || ''}
          fill
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
        {props.alt && (
          <span className="sr-only">
            {props.alt}
          </span>
        )}
      </span>
    );
  },
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const blog = await prisma.blog.findUnique({
    where: { slug: params.slug },
    include: {
      author: {
        select: { name: true, email: true, image: true },
      },
    },
  }) as any

  if (!blog || !blog.published) {
    notFound()
  }

  // Fetch related posts
  const relatedPosts = await prisma.blog.findMany({
    where: { 
      published: true,
      NOT: { slug: params.slug }
    },
    take: 2,
    orderBy: { createdAt: 'desc' }
  })

  const readingTime = calculateReadingTime(blog.content)
  const wordCount = blog.content.split(/\s/g).length

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.oxiverse.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://www.oxiverse.com/blog'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: blog.title,
        item: `https://www.oxiverse.com/blog/${params.slug}`
      }
    ]
  }

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt,
    image: blog.imageUrl,
    datePublished: blog.publishedAt || blog.createdAt,
    dateModified: blog.updatedAt || blog.publishedAt || blog.createdAt,
    wordCount: wordCount,
    timeRequired: `PT${Math.ceil(wordCount / 200)}M`,
    author: {
      '@type': 'Person',
      name: (blog.author as any).name || (blog.author as any).email,
      url: `https://www.oxiverse.com/authors/${(blog.author as any).name?.toLowerCase().replace(/\s+/g, '-') || 'admin'}`
    },
    publisher: {
      '@type': 'Organization',
      name: 'Oxiverse',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.oxiverse.com/favicon-256x256.png'
      },
      url: 'https://www.oxiverse.com'
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.oxiverse.com/blog/${params.slug}`
    },
    keywords: 'privacy, search engine, decentralized, infrastructure, oxiverse'
  }

  return (
    <main className="min-h-screen bg-dark-950 pt-20">
      <Navigation />
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
        />

        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border-b border-dark-700 pb-12"
        >
          <div className="flex items-center gap-2 mb-6 text-primary-400 text-sm font-medium tracking-wider uppercase">
            <Link href="/blog" className="hover:text-primary-300 transition-colors">Blog</Link>
            <span>•</span>
            <time dateTime={blog.publishedAt?.toISOString() || blog.createdAt.toISOString()}>
              {formatDate(blog.publishedAt || blog.createdAt)}
            </time>
            <span>•</span>
            <span className="text-dark-400">{readingTime}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight leading-tight">
            {blog.title}
          </h1>
          
          <div className="flex items-center gap-4">
            {blog.imageUrl && (
              <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 shadow-lg overflow-hidden flex items-center justify-center p-1.5 flex-shrink-0">
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            )}
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20">
                {(blog.author as any).image ? (
                  <Image
                    src={(blog.author as any).image}
                    alt={(blog.author as any).name || 'Author'}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-dark-700 flex items-center justify-center">
                    <span className="text-xs text-white">{((blog.author as any).name || (blog.author as any).email).charAt(0)}</span>
                  </div>
                )}
              </div>
              <span className="text-sm font-medium text-dark-200">{(blog.author as any).name || (blog.author as any).email}</span>
            </div>
          </div>
        </motion.header>

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="py-12"
        >
          {blog.excerpt && (
            <div className="mb-12 p-8 bg-gradient-to-br from-dark-900 to-dark-800 rounded-3xl border border-white/10 shadow-inner">
              <p className="text-xl md:text-2xl text-dark-200 font-light italic leading-relaxed">
                "{blog.excerpt}"
              </p>
            </div>
          )}

          <div className="prose prose-invert prose-lg max-w-none 
            prose-p:text-dark-300 prose-p:leading-relaxed
            prose-headings:text-white prose-headings:font-bold
            prose-a:text-primary-400 prose-a:no-underline hover:prose-a:text-primary-300
            prose-strong:text-white prose-code:text-primary-300
            prose-img:rounded-2xl prose-blockquote:border-primary-500
            prose-blockquote:bg-dark-900/50 prose-blockquote:py-1 prose-blockquote:px-6
          ">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={MarkdownComponents}
            >
              {blog.content}
            </ReactMarkdown>
          </div>
        </motion.div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-dark-700 pt-16 mt-16">
            <h3 className="text-2xl font-black text-white mb-8 uppercase tracking-tighter">Related Content_</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <div className="bg-white/5 border border-white/10 p-6 h-full hover:border-primary-500/50 transition-colors">
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-primary-400 transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-dark-400 text-sm line-clamp-2">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Post Footer */}
        <footer className="border-t border-dark-700 pt-8 mt-12">
          <Link href="/blog" className="text-primary-400 hover:text-primary-300 text-sm">
            ← Back to all posts
          </Link>
        </footer>
      </article>
      <Footer />
    </main>
  )
}
