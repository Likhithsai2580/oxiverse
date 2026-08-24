'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ExternalLink, ChevronRight, Activity } from 'lucide-react'

const sectionTitles: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/blog': 'Blog Posts',
  '/admin/research': 'Research Papers',
  '/admin/pages': 'CMS Pages',
  '/admin/banners': 'Banners',
  '/admin/posters': 'Posters',
  '/admin/ecosystem': 'Ecosystem',
  '/admin/assets': 'Media Assets',
  '/admin/roadmap': 'Roadmap',
  '/admin/settings': 'Settings',
}

export default function AdminTopbar() {
  const pathname = usePathname()

  const matchedPath = Object.keys(sectionTitles)
    .sort((a, b) => b.length - a.length)
    .find((path) => pathname.startsWith(path))

  const sectionName = matchedPath ? sectionTitles[matchedPath] : 'Overview'
  const isEditing = /\/admin\/(blog|research|pages|banners|posters|ecosystem)\/.+/.test(pathname)
  const isNew = pathname.endsWith('/new')

  return (
    <header className="flex items-center justify-between px-6 sm:px-8 h-14 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md flex-shrink-0 sticky top-0 z-30">
      {/* Breadcrumb path */}
      <nav className="flex items-center gap-2 text-xs font-medium text-zinc-400">
        <span className="text-zinc-500 font-mono text-[11px]">ADMIN</span>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
        <Link
          href={matchedPath || '/admin/dashboard'}
          className={`hover:text-white transition-colors ${
            !isEditing ? 'text-zinc-100 font-semibold' : ''
          }`}
        >
          {sectionName}
        </Link>
        {isEditing && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-sky-400 font-semibold">
              {isNew ? 'New Entry' : 'Editor'}
            </span>
          </>
        )}
      </nav>

      {/* Right controls: System Pulse + View Site */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Production Live
        </div>

        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors px-2.5 py-1 rounded-md hover:bg-zinc-800/50"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
        </Link>
      </div>
    </header>
  )
}