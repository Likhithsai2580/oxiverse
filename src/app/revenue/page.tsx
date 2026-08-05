import React from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import RevenueContent from './RevenueContent'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Revenue Distribution Protocol | Oxiverse',
  description: 'The ORDP defines how Oxiverse distributes revenue to operator teams: anti-mob voting floors, adaptive consensus, and a deterministic 4-layer protocol.',
  alternates: {
    canonical: '/revenue',
  },
}

export default function RevenuePage() {
  return (
    <main className="min-h-screen bg-transparent flex flex-col">
      <Navigation />
      <div className="flex-grow pt-24">
        <RevenueContent />
      </div>
      <Footer />
    </main>
  )
}