import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export const revalidate = 60

interface PageProps {
  params: { slug: string, path?: string[] }
}

export async function generateMetadata() {
  return {
    title: 'Docs - Oxiverse Ecosystem',
    description: 'Documentation for all Oxiverse ecosystem products and projects.',
  }
}

export default async function ProjectDocsPage({ params }: PageProps) {
  const project = await prisma.project.findUnique({ where: { slug: params.slug } })
  if (!project) {
    redirect('https://docs.oxiverse.com')
  }

  const currentPathSegments = params.path || []
  const subPath = currentPathSegments.join('/')
  const url = `https://docs.oxiverse.com/${project.slug}${subPath ? '/' + subPath : ''}`
  redirect(url)
}