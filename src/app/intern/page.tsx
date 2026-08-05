import React from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import InternContent from './InternContent'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Intern Model | Oxiverse',
  description: 'How the Oxiverse internship works: a pre-operator training and validation phase contributing to production-grade systems under the Oxiverse Constitution.',
  alternates: {
    canonical: '/intern',
  },
}

export default function InternPage() {
  return (
    <main className="min-h-screen bg-transparent flex flex-col">
      <Navigation />
      <div className="flex-grow pt-24">
        <InternContent />
      </div>
      <Footer />
    </main>
  )
}