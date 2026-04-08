import React from 'react'
import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import PrivacyContent from './PrivacyContent'

export const metadata: Metadata = {
  title: 'Privacy Protocol | Oxiverse',
  description: 'Oxiverse Zero-Persistence Privacy Protocol. No storage, no tracking, total transparency.',
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-primary-800 retro-bg selection:bg-accent-300 selection:text-primary-950">
      <Navigation />
      <PrivacyContent />
      <Footer />
    </main>
  )
}
