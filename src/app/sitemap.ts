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

  // Fetch all projects for docs
  const projects = await prisma.project.findMany({
    select: { slug: true, link: true, updatedAt: true },
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
    '/cofounder',
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
    images: blog.imageUrl ? [blog.imageUrl] : [],
  }))

  const researchRoutes = researchPapers.map((paper) => ({
    url: `${baseUrl}/research/${paper.slug}`,
    lastModified: paper.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
    images: paper.imageUrl ? [paper.imageUrl] : [],
  }))

  // Documentation routes
  const docRoutes: MetadataRoute.Sitemap = []
  for (const project of projects) {
    docRoutes.push({
      url: `${baseUrl}/docs/${project.slug}`,
      lastModified: project.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })

    // Try to discover sub-pages from Codeberg
    if (project.link?.includes('codeberg.org')) {
      const repoPath = project.link.replace('https://codeberg.org/', '').replace(/\/$/, '')
      try {
        // We only fetch main/master for the sitemap to avoid excessive API calls
        const res = await fetch(`https://codeberg.org/api/v1/repos/${repoPath}/git/trees/main?recursive=true`)
        if (res.ok) {
          const data = await res.json()
          if (data && Array.isArray(data.tree)) {
            data.tree
              .filter((item: any) => item.path.startsWith('docs/') && item.path.toLowerCase().endsWith('.md'))
              .forEach((item: any) => {
                const relativePath = item.path.replace('docs/', '').replace('.md', '')
                if (relativePath.toLowerCase() !== 'readme' && relativePath.toLowerCase() !== 'index') {
                  docRoutes.push({
                    url: `${baseUrl}/docs/${project.slug}/${relativePath}`,
                    lastModified: project.updatedAt,
                    changeFrequency: 'weekly' as const,
                    priority: 0.5,
                  })
                }
              })
          }
        }
      } catch (e) {
        // Skip on error
      }
    }
  }

  return [...routes, ...blogRoutes, ...researchRoutes, ...docRoutes]
}
