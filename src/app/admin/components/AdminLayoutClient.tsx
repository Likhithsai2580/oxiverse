'use client'

import React, { useState, useEffect, ReactNode } from 'react'
import Image from 'next/image'
import AdminSidebar from './AdminSidebar'
import AdminTopbar from './AdminTopbar'
import { Menu } from 'lucide-react'

export default function AdminLayoutClient({
  children,
  session,
}: {
  children: ReactNode
  session: any
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Optimize the admin shell: flat zinc background, clean scrolling
  useEffect(() => {
    document.body.classList.add('admin-shell')
    return () => {
      document.body.classList.remove('admin-shell')
    }
  }, [])

  if (!session) {
    return <main className="flex-1 bg-zinc-950 min-h-screen">{children}</main>
  }

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100 antialiased font-sans">
      {/* Mobile Header Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-zinc-950/95 backdrop-blur-md z-40 flex items-center px-4 justify-between border-b border-zinc-800/80">
        <div className="flex items-center gap-2.5">
          <div className="relative w-7 h-7 bg-zinc-900 rounded-md border border-zinc-800 flex items-center justify-center p-1">
            <Image
              src="/oxiverse-logo.svg"
              alt="Oxiverse Logo"
              width={18}
              height={18}
              className="object-contain"
            />
          </div>
          <span className="text-sm font-black tracking-tight text-white uppercase">
            Oxi<span className="text-sky-400">verse</span>
          </span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Sidebar Drawer (Mobile) / Fixed Sidebar (Desktop) */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform lg:relative lg:translate-x-0 transition-transform duration-200 ease-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <AdminSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Mobile Backdrop Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col pt-14 lg:pt-0 min-w-0 bg-zinc-950">
        <div className="hidden lg:block">
          <AdminTopbar />
        </div>
        <div className="flex-1 overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  )
}