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

interface BlogPostPageProps {
  params: { slug: string }
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
              '@type': 'BlogPosting',
              headline: blog.title,
              description: blog.excerpt,
              image: blog.imageUrl,
              datePublished: blog.publishedAt || blog.createdAt,
              dateModified: blog.updatedAt || blog.publishedAt || blog.createdAt,
              author: {
                '@type': 'Person',
                name: (blog.author as any).name || (blog.author as any).email,
                url: `https://oxiverse.com/authors/${(blog.author as any).name?.toLowerCase().replace(/\s+/g, '-') || 'admin'}`
              },
              publisher: {
                '@type': 'Organization',
                name: 'Oxiverse',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://oxiverse.com/favicon-256x256.png'
                }
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://oxiverse.com/blog/${params.slug}`
              },
              keywords: 'privacy, search engine, decentralized, infrastructure, oxiverse'
            }),
          }}
        />
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border-b border-dark-700 pb-12"
        >
          <div className="flex items-center gap-2 mb-6 text-primary-400 text-sm font-medium tracking-wider uppercase">
            <span>Blog</span>
            <span>•</span>
            <time dateTime={blog.publishedAt?.toISOString() || blog.createdAt.toISOString()}>
              {formatDate(blog.publishedAt || blog.createdAt)}
            </time>
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

        {/* Post Footer */}
        <footer className="border-t border-dark-700 pt-8 mt-12">
          <a href="/blog" className="text-primary-400 hover:text-primary-300 text-sm">
            ← Back to all posts
          </a>
        </footer>
      </article>
      <Footer />
    </main>
  )
}
