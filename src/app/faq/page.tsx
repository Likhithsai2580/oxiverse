import React from 'react'
import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FaqContent from './FaqContent'

export const metadata: Metadata = {
  title: 'System FAQ | Oxiverse',
  description: 'Frequently Asked Questions about Oxiverse — a comprehensive, privacy-first alternative to Big Tech with search, browser, email, and docs built on data sovereignty.',
  alternates: {
    canonical: '/faq',
  },
}

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-primary-800 retro-bg selection:bg-accent-300 selection:text-primary-950">
      <Navigation />
      <FaqContent />
      <Footer />
    </main>
  )
}
