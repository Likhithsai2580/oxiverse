import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const catalog = {
    version: '1.0',
    description: 'Oxiverse API Catalog — machine-readable index of agent-accessible endpoints.',
    endpoints: [
      {
        path: '/api/blog',
        description: 'Blog posts listing and creation',
        methods: ['GET', 'POST'],
        rel: 'service-desc',
      },
      {
        path: '/api/research',
        description: 'Research papers listing and creation',
        methods: ['GET', 'POST'],
      },
      {
        path: '/api/roadmap',
        description: 'Project roadmap data',
        methods: ['GET', 'POST'],
      },
      {
        path: '/api/announcement',
        description: 'Site announcement banner data',
        methods: ['GET', 'POST'],
      },
      {
        path: '/api/newsletter',
        description: 'Newsletter subscription',
        methods: ['POST'],
      },
      {
        path: '/api/posters',
        description: 'Posters listing and creation',
        methods: ['GET', 'POST'],
      },
      {
        path: '/api/admin/ecosystem',
        description: 'Ecosystem projects (admin)',
        methods: ['GET', 'POST'],
      },
      {
        path: '/api/admin/assets',
        description: 'Media assets management (admin)',
        methods: ['GET', 'DELETE'],
      },
      {
        path: '/api/admin/categories',
        description: 'Content categories (admin)',
        methods: ['GET', 'POST'],
      },
      {
        path: '/api/admin/tags',
        description: 'Content tags (admin)',
        methods: ['GET', 'POST'],
      },
      {
        path: '/api/admin/redirects',
        description: 'Slug redirect management (admin)',
        methods: ['GET', 'POST', 'DELETE'],
      },
    ],
    resources: [
      {
        path: '/docs',
        description: 'Project documentation hub',
        rel: 'service-doc',
      },
      {
        path: '/sitemap.xml',
        description: 'XML sitemap for crawlers',
        rel: 'sitemap',
      },
      {
        path: '/robots.txt',
        description: 'Robots exclusion and content signals',
      },
    ],
    documentation: 'https://oxiverse.com/docs',
  }

  return NextResponse.json(catalog, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
