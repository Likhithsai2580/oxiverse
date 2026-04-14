import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await prisma.blog.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  })

  const papers = await prisma.researchPaper.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  })

  const projects = await prisma.project.findMany({
    select: { slug: true, updatedAt: true },
  })

  const blogEntries: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${siteConfig.url}/blog/${blog.slug}`,
    lastModified: blog.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const researchEntries: MetadataRoute.Sitemap = papers.map((paper) => ({
    url: `${siteConfig.url}/research/${paper.slug}`,
    lastModified: paper.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const docsEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteConfig.url}/docs/${project.slug}`,
    lastModified: project.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/research`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/license`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...blogEntries,
    ...researchEntries,
    ...docsEntries,
  ]
}
