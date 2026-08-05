import React from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import OperatorContent from './OperatorContent'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Operator Model | Oxiverse',
  description: 'How partnerships work at Oxiverse: autonomous operators run validated projects under a revenue-share model bounded by the Oxiverse Constitution.',
  alternates: {
    canonical: '/operator',
  },
}

export default function OperatorPage() {
  return (
    <main className="min-h-screen bg-transparent flex flex-col">
      <Navigation />
      <div className="flex-grow pt-24">
        <OperatorContent />
      </div>
      <Footer />
    </main>
  )
}