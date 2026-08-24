'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Files,
  Megaphone,
  Sparkles,
  Network,
  Image as ImageIcon,
  Milestone,
  Sliders,
  LogOut,
  X,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react'

const navGroups = [
  {
    label: 'Overview',
    items: [
      { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Content Engine',
    items: [
      { name: 'Blog Posts', href: '/admin/blog', icon: BookOpen },
      { name: 'Research Papers', href: '/admin/research', icon: GraduationCap },
      { name: 'Pages', href: '/admin/pages', icon: Files },
      { name: 'Banners', href: '/admin/banners', icon: Megaphone },
      { name: 'Posters', href: '/admin/posters', icon: Sparkles },
    ],
  },
  {
    label: 'Ecosystem & Media',
    items: [
      { name: 'Ecosystem', href: '/admin/ecosystem', icon: Network },
      { name: 'Media Assets', href: '/admin/assets', icon: ImageIcon },
      { name: 'Roadmap', href: '/admin/roadmap', icon: Milestone },
    ],
  },
  {
    label: 'Preferences',
    items: [
      { name: 'Settings', href: '/admin/settings', icon: Sliders },
    ],
  },
]

export default function AdminSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <aside className="flex flex-col w-64 h-screen bg-zinc-950 border-r border-zinc-800/80 select-none">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-5 h-16 border-b border-zinc-800/80 flex-shrink-0">
        <Link href="/admin/dashboard" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center p-1 group-hover:border-zinc-700 transition-all shadow-inner">
            <Image
              src="/oxiverse-logo.svg"
              alt="Oxiverse Logo"
              width={22}
              height={22}
              className="object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black tracking-tight text-white uppercase">
                Oxi<span className="text-sky-400">verse</span>
              </span>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 font-medium">Control Plane</p>
          </div>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800">
        {navGroups.map((group) => (
          <div key={group.label} className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
              {group.label}
            </p>
            {group.items.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href))

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => onClose?.()}
                  className={`flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg transition-all group ${
                    isActive
                      ? 'bg-zinc-800/90 text-white shadow-sm border border-zinc-700/60 font-bold'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-sky-400' : 'text-zinc-500 group-hover:text-zinc-300'
                    }`}
                  />
                  <span>{item.name}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-400 shadow-sm shadow-sky-400/80" />
                  )}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* User Footer Profile */}
      <div className="p-3 border-t border-zinc-800/80 bg-zinc-950/40">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60 mb-2">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-sky-500/20 to-purple-500/20 border border-zinc-700/80 flex items-center justify-center text-xs font-bold text-sky-300 uppercase">
            {session?.user?.name?.[0] || session?.user?.email?.[0] || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate">
              {session?.user?.name || 'Administrator'}
            </p>
            <p className="text-[10px] text-zinc-500 truncate">
              {session?.user?.email || 'admin@oxiverse.com'}
            </p>
          </div>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex items-center justify-center gap-2 w-full px-3 py-1.5 text-xs font-medium text-zinc-400 rounded-md hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/20 border border-transparent transition-all cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
