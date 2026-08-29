import React from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import InternContent from './InternContent'
import { getOclVersionLabel } from '@/lib/license'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Intern Model | Oxiverse',
  description: 'How the Oxiverse internship works: a pre-operator professional development and training phase with structured learning, research, and supervised contribution under the Oxiverse Constitution.',
  alternates: {
    canonical: '/intern',
  },
}

export default async function InternPage() {
  const version = await getOclVersionLabel()
  return (
    <main className="min-h-screen bg-transparent flex flex-col">
      <Navigation />
      <div className="flex-grow pt-24">
        <InternContent version={version} />
      </div>
      <Footer />
    </main>
  )
}