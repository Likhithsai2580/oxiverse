import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: 'https://oxiverse.com/sitemap.xml',
    other: {
      'Content-Signal': 'ai-train=yes, search=yes, ai-input=yes',
    },
  }
}
