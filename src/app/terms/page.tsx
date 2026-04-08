import React from 'react'
import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import TermsContent from './TermsContent'

export const metadata: Metadata = {
  title: 'Network Terms | Oxiverse',
  description: 'Oxiverse operational guidelines, licensing, and acceptable use policies.',
}

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-primary-800 retro-bg selection:bg-accent-300 selection:text-primary-950">
      <Navigation />
      <TermsContent />
      <Footer />
    </main>
  )
}
