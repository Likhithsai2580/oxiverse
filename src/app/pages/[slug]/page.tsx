import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { redirect } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import Mermaid from '@/components/Mermaid'

const SITE_URL = 'https://oxiverse.com'

export const revalidate = 60

interface CmsPageProps {
  params: { slug: string }
  searchParams?: { preview?: string }
}

export async function generateStaticParams() {
  const pages = await prisma.cmsPage.findMany({
    where: { published: true },
    select: { slug: true },
  })
  return pages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: CmsPageProps): Promise<Metadata> {
  const page = await prisma.cmsPage.findUnique({
    where: { slug: params.slug },
  })

  if (!page) {
    return { title: 'Page Not Found - Oxiverse' }
  }

  return {
    title: `${page.metaTitle || page.title} - Oxiverse`,
    description: page.metaDescription || page.excerpt || `Learn more about ${page.title} on Oxiverse`,
    alternates: {
      canonical: `${SITE_URL}/pages/${params.slug}`,
    },
    openGraph: {
      title: page.metaTitle || page.title,
      description: page.metaDescription || page.excerpt || undefined,
      type: 'website',
      images: page.imageUrl ? [{ url: page.imageUrl }] : [],
    },
  }
}

const MarkdownComponents = {
  img: (props: any) => {
    return (
      <span className="block my-12 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative w-full aspect-video">
        <Image
          src={props.src}
          alt={props.alt || ''}
          fill
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
      </span>
    )
  },
  code: ({ node, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '')
    if (match && match[1] === 'mermaid') {
      return <Mermaid chart={String(children).replace(/\n$/, '')} />
    }
    return <code className={className} {...props}>{children}</code>
  },
}

export default async function CmsPageRenderer({ params, searchParams }: CmsPageProps) {
  const isPreview = searchParams?.preview === '1'

  // Draft isolation: unpublished pages are invisible by default. Only an admin
  // hitting ?preview=1 may view them. Drafts never reach the public by accident.
  let allowUnpublished = false
  if (isPreview) {
    const session = await getServerSession(authOptions)
    allowUnpublished = session?.user?.role === 'ADMIN'
  }

  const page = await prisma.cmsPage.findUnique({
    where: { slug: params.slug },
    include: {
      parent: { select: { title: true, slug: true } },
      children: {
        where: { published: true },
        orderBy: { order: 'asc' },
        select: { title: true, slug: true, excerpt: true },
      },
    },
  })

  if (!page || (!page.published && !allowUnpublished)) {
    // Check for a dynamic redirect (old slug → new slug) before 404
    const slugRedirect = await prisma.slugRedirect.findUnique({
      where: { oldPath: `/pages/${params.slug}` },
    })
    if (slugRedirect) {
      redirect(slugRedirect.newPath)
    }
    notFound()
  }

  return (
    <main className="min-h-screen bg-dark-950 pt-20">
      <Navigation />
      <article className="max-w-4xl mx-auto px-4 py-12">
        {page.parent && (
          <div className="mb-4 text-primary-400 text-sm font-medium tracking-wider uppercase">
            <Link href={`/pages/${page.parent.slug}`} className="hover:text-primary-300 transition-colors">
              {page.parent.title}
            </Link>
          </div>
        )}

        {page.imageUrl && (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 mb-8 shadow-2xl">
            <Image
              src={page.imageUrl}
              alt={page.title}
              fill
              className={`object-${page.imageDisplay}`}
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        )}

        <header className="border-b border-dark-700 pb-10 mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
            {page.title}
          </h1>
          {page.excerpt && (
            <p className="text-xl text-dark-400 font-light leading-relaxed">{page.excerpt}</p>
          )}
        </header>

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
            {page.content}
          </ReactMarkdown>
        </div>

        {page.children.length > 0 && (
          <section className="border-t border-dark-700 pt-12 mt-16">
            <h3 className="text-2xl font-black text-white mb-8 uppercase tracking-tighter">Sub-Pages_</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {page.children.map((child) => (
                <Link key={child.slug} href={`/pages/${child.slug}`} className="group">
                  <div className="bg-white/5 border border-white/10 p-6 h-full hover:border-primary-500/50 transition-colors">
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                      {child.title}
                    </h4>
                    {child.excerpt && (
                      <p className="text-dark-400 text-sm line-clamp-2">{child.excerpt}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
      <Footer />
    </main>
  )
}