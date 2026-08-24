'use client'

import React, { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Badge,
} from '@/components/admin/ui'
import { useToastContext } from '@/lib/providers/ToastProvider'
import {
  Megaphone,
  Plus,
  Search,
  Trash2,
  Edit,
  ExternalLink,
  Power,
  Calendar,
  Image as ImageIcon,
} from 'lucide-react'

interface Banner {
  id: string
  title: string
  imageUrl: string | null
  message: string | null
  link: string | null
  placement: string
  active: boolean
  order: number
  startAt: string | null
  endAt: string | null
}

const PLACEMENT_LABELS: Record<string, string> = {
  announcement: 'Announcement Bar',
  hero: 'Hero Section',
  section: 'Promotional Section',
}

export default function AdminBannersPage() {
  const { success, error } = useToastContext()
  const [banners, setBanners] = useState<Banner[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchBanners()
  }, [])

  const fetchBanners = async () => {
    try {
      const res = await fetch('/api/admin/banners')
      if (res.ok) {
        setBanners(await res.json())
      } else {
        error('Failed to load banners')
      }
    } catch (err) {
      error('Failed to load banners')
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleActive = async (banner: Banner) => {
    try {
      const res = await fetch(`/api/admin/banners/${banner.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !banner.active }),
      })
      if (res.ok) {
        success(banner.active ? 'Banner deactivated' : 'Banner activated')
        fetchBanners()
      } else {
        error('Failed to update banner')
      }
    } catch (err) {
      error('Failed to update banner')
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete banner "${title}"?`)) return
    try {
      const res = await fetch(`/api/admin/banners/${id}`, { method: 'DELETE' })
      if (res.ok) {
        success('Banner deleted')
        fetchBanners()
      } else {
        error('Failed to delete banner')
      }
    } catch (err) {
      error('Failed to delete banner')
    }
  }

  const filteredBanners = useMemo(() => {
    return banners.filter((banner) => {
      return (
        banner.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (banner.message && banner.message.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (banner.placement && banner.placement.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    })
  }, [banners, searchQuery])

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Promotional & Alert Banners
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Manage top announcement bars, hero banners, and scheduled campaigns.
          </p>
        </div>

        <Link href="/admin/banners/new">
          <Button variant="default" size="sm" className="font-bold">
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            New Banner
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative bg-zinc-900/50 p-2.5 rounded-xl border border-zinc-800/80">
        <Search className="absolute left-5 top-4 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          placeholder="Search banners by title, message, or placement..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-zinc-950/80 border border-zinc-800 rounded-lg pl-9 pr-4 py-1.5 text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
      </div>

      {/* Banners List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-zinc-900/40 rounded-xl border border-zinc-800 animate-pulse" />
          ))}
        </div>
      ) : filteredBanners.length === 0 ? (
        <Card className="text-center py-16 border-zinc-800/80 bg-zinc-950/40">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4 text-zinc-500 shadow-inner">
            <Megaphone className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">No banners configured</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-6">
            Create announcement bars or promotional campaigns to broadcast to users.
          </p>
          <Link href="/admin/banners/new">
            <Button variant="outline" size="sm">
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              Create First Banner
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredBanners.map((banner) => (
            <Card
              key={banner.id}
              className="border-zinc-800/80 bg-zinc-950/60 hover:border-zinc-700/80 hover:bg-zinc-900/30 transition-all p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-4 min-w-0 flex-1">
                {banner.imageUrl ? (
                  <div className="w-16 h-12 rounded-lg bg-zinc-900 border border-zinc-800 overflow-hidden flex-shrink-0">
                    <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 flex-shrink-0">
                    <Megaphone className="w-5 h-5" />
                  </div>
                )}

                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={banner.active ? 'success' : 'destructive'} dot>
                      {banner.active ? 'Active' : 'Inactive'}
                    </Badge>
                    <span className="text-[10px] font-semibold text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                      {PLACEMENT_LABELS[banner.placement] || banner.placement}
                    </span>
                    {(banner.startAt || banner.endAt) && (
                      <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-zinc-600" />
                        {banner.startAt ? new Date(banner.startAt).toLocaleDateString() : 'Now'} → {banner.endAt ? new Date(banner.endAt).toLocaleDateString() : 'Forever'}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/admin/banners/${banner.id}`}
                    className="text-sm font-bold text-white group-hover:text-sky-400 transition-colors truncate block"
                  >
                    {banner.title}
                  </Link>

                  <p className="text-xs text-zinc-400 line-clamp-1">
                    {banner.message || (banner.imageUrl ? 'Image-only Banner' : 'No message text')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <Button
                  variant={banner.active ? 'secondary' : 'outline'}
                  size="sm"
                  onClick={() => handleToggleActive(banner)}
                >
                  <Power className="w-3.5 h-3.5 mr-1.5" />
                  {banner.active ? 'Deactivate' : 'Activate'}
                </Button>

                <Link href={`/admin/banners/${banner.id}`}>
                  <Button variant="outline" size="sm">
                    <Edit className="w-3.5 h-3.5 mr-1.5" />
                    Edit
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                  onClick={() => handleDelete(banner.id, banner.title)}
                  title="Delete Banner"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}