'use client'

import { useState, ReactNode } from 'react'
import Image from 'next/image'
import AdminSidebar from './AdminSidebar'

export default function AdminLayoutClient({ 
  children, 
  session 
}: { 
  children: ReactNode, 
  session: any 
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  if (!session) {
    return <main className="flex-1">{children}</main>
  }

  return (
    <div className="flex min-h-screen bg-dark-950">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-dark-900/80 backdrop-blur-xl border-b border-white/5 z-40 flex items-center px-4 justify-between">
        <div className="flex items-center gap-2">
           <div className="relative w-8 h-8">
            <Image 
              src="/favicon-256x256.png" 
              alt="Oxiverse Logo" 
              fill 
              className="object-contain"
            />
          </div>
          <span className="text-lg font-black text-white tracking-tighter uppercase italic">
            Oxi<span className="text-primary-500 not-italic">verse</span>
          </span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-dark-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isSidebarOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 transform lg:relative lg:translate-x-0 transition duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <AdminSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className={`flex-1 flex flex-col pt-16 lg:pt-0 transition-all duration-300`}>
        {children}
      </main>
    </div>
  )
}
