'use client'

import React, { useEffect, useState } from 'react'
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
  Sparkles,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Calendar,
} from 'lucide-react'

interface Poster {
  id: string
  title: string
  slug: string
  imageUrl: string
  link: string | null
  createdAt: string
}

export default function AdminPostersPage() {
  const { success, error } = useToastContext()
  const [posters, setPosters] = useState<Poster[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPosters()
  }, [])

  const fetchPosters = async () => {
    try {
      const res = await fetch('/api/posters')
      if (res.ok) {
        setPosters(await res.json())
      } else {
        error('Failed to load posters')
      }
    } catch (err) {
      error('Failed to load posters')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete poster "${title}"?`)) return

    try {
      const res = await fetch(`/api/posters/${id}`, { method: 'DELETE' })
      if (res.ok) {
        success('Poster deleted')
        setPosters((prev) => prev.filter((p) => p.id !== id))
      } else {
        error('Failed to delete poster')
      }
    } catch (err) {
      error('Failed to delete poster')
    }
  }

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Visual Posters & Artwork
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Curate aesthetic visual cards, brand posters, and outbound project links.
          </p>
        </div>

        <Link href="/admin/posters/new">
          <Button variant="default" size="sm" className="font-bold">
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            New Poster
          </Button>
        </Link>
      </div>

      {/* Posters Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-[3/4] rounded-xl bg-zinc-900/40 border border-zinc-800 animate-pulse" />
          ))}
        </div>
      ) : posters.length === 0 ? (
        <Card className="text-center py-16 border-zinc-800/80 bg-zinc-950/40">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4 text-zinc-500 shadow-inner">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">No posters added</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-6">
            Upload your first aesthetic visual poster to showcase in the community gallery.
          </p>
          <Link href="/admin/posters/new">
            <Button variant="outline" size="sm">
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              Upload First Poster
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {posters.map((poster) => (
            <Card
              key={poster.id}
              className="p-0 overflow-hidden border-zinc-800/80 bg-zinc-950/60 hover:border-zinc-700/80 transition-all group flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] bg-zinc-950 overflow-hidden">
                <img
                  src={poster.imageUrl}
                  alt={poster.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <p className="text-xs font-bold text-white mb-2">{poster.title}</p>
                  <div className="flex gap-2">
                    <Link href={`/admin/posters/${poster.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full h-7 text-[11px] bg-zinc-900/80">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleDelete(poster.id, poster.title)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="absolute top-2 right-2">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-zinc-300 border border-white/10">
                    {new Date(poster.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>

              <div className="p-3 border-t border-zinc-800/60 flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-200 truncate">{poster.title}</span>
                {poster.link && (
                  <Link href={poster.link} target="_blank">
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-500 hover:text-white" />
                  </Link>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
