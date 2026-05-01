import React from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CofounderContent from './CofounderContent'

export const metadata = {
  title: 'Looking for a Co-founder | Oxiverse',
  description: 'Join Oxiverse as a co-founder. We are building a privacy-focused, source-available ecosystem for everyone.',
}

export default function CofounderPage() {
  return (
    <main className="min-h-screen bg-transparent flex flex-col">
      <Navigation />
      <div className="flex-grow pt-24">
        <CofounderContent />
      </div>
      <Footer />
    </main>
  )
}
