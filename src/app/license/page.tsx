import React from 'react'
import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import LicenseContent from './LicenseContent'

export const metadata: Metadata = {
  title: 'IECL License | Oxiverse',
  description: 'Intent Engine Community License (IECL) v1.0. Non-commercial open research and commercial licensing terms.',
}

export default function LicensePage() {
  return (
    <main className="min-h-screen bg-primary-800 retro-bg selection:bg-accent-300 selection:text-primary-950">
      <Navigation />
      <LicenseContent />
      <Footer />
    </main>
  )
}
