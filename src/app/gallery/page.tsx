import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import GalleryClient from './GalleryClient'

export const metadata: Metadata = {
  title: 'Visual Gallery & Aesthetic Artifacts - Oxiverse',
  description: 'Explore the visual artifacts, posters, and aesthetic blueprints of the Oxiverse ecosystem.',
  openGraph: {
    title: 'Visual Gallery & Aesthetic Artifacts - Oxiverse',
    description: 'Explore the visual artifacts, posters, and aesthetic blueprints of the Oxiverse ecosystem.',
  },
}

export const revalidate = 60

export default async function GalleryPage() {
  const posters = await prisma.poster.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      imageUrl: true,
      link: true,
      createdAt: true,
    },
  })

  return (
    <main className="min-h-screen bg-primary-950 text-primary-50">
      <Navigation />
      <GalleryClient initialPosters={posters.map(p => ({
        ...p,
        createdAt: p.createdAt.toISOString()
      }))} />
      <Footer />
    </main>
  )
}
