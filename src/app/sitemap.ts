import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://oxiverse.com'

  // Fetch all published blogs
  const blogs = await prisma.blog.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  })

  // Fetch all published research papers
  const researchPapers = await prisma.researchPaper.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  })

  // Static routes
  const routes = [
    '',
    '/blog',
    '/research',
    '/privacy',
    '/terms',
    '/license',
    '/docs',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const blogRoutes = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: blog.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const researchRoutes = researchPapers.map((paper) => ({
    url: `${baseUrl}/research/${paper.slug}`,
    lastModified: paper.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...routes, ...blogRoutes, ...researchRoutes]
}
