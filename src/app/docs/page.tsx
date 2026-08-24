import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Docs - Oxiverse Ecosystem',
  description: 'Documentation for all Oxiverse ecosystem products and projects.',
}

export default async function DocsPage() {
  redirect('https://docs.oxiverse.com')
}
