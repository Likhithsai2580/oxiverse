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
  Files,
  Plus,
  Search,
  Trash2,
  Edit,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  Navigation,
  FolderTree,
} from 'lucide-react'

interface CmsPage {
  id: string
  title: string
  slug: string
  excerpt: string | null
  published: boolean
  showInNav: boolean
  order: number
  parentId: string | null
  parent?: { id: string; title: string; slug: string } | null
  _count?: { children: number }
  createdAt: string
}

export default function AdminPagesPage() {
  const { success, error } = useToastContext()
  const [pages, setPages] = useState<CmsPage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/admin/pages')
      if (res.ok) {
        setPages(await res.json())
      } else {
        error('Failed to load pages')
      }
    } catch (err) {
      error('Failed to load pages')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? Any subpages will be unlinked.`)) return

    try {
      const res = await fetch(`/api/admin/pages/${id}`, { method: 'DELETE' })
      if (res.ok) {
        success('Page deleted successfully')
        fetchPages()
      } else {
        error('Failed to delete page')
      }
    } catch (err) {
      error('Failed to delete page')
    }
  }

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    const siblings = pages
      .filter((p) => (p.parentId ?? null) === (pages.find((x) => x.id === id)?.parentId ?? null))
      .sort((a, b) => a.order - b.order)
    const index = siblings.findIndex((p) => p.id === id)
    const swapIndex = direction === 'up' ? index - 1 : index + 1
    if (index < 0 || swapIndex < 0 || swapIndex >= siblings.length) return

    const a = siblings[index]
    const b = siblings[swapIndex]
    await Promise.all([
      fetch(`/api/admin/pages/${a.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: b.order }),
      }),
      fetch(`/api/admin/pages/${b.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: a.order }),
      }),
    ])
      .then(() => {
        success('Page order updated')
        fetchPages()
      })
      .catch(() => error('Failed to reorder page'))
  }

  const filteredPages = useMemo(() => {
    return pages.filter((page) => {
      return (
        page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (page.excerpt && page.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    })
  }, [pages, searchQuery])

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            CMS Pages & Hierarchy
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Create and organize structured static documentation and policy pages.
          </p>
        </div>

        <Link href="/admin/pages/new">
          <Button variant="default" size="sm" className="font-bold">
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            New Page
          </Button>
        </Link>
      </div>

      {/* Search Filter */}
      <div className="relative bg-zinc-900/50 p-2.5 rounded-xl border border-zinc-800/80">
        <Search className="absolute left-5 top-4 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          placeholder="Search pages by title or slug..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-zinc-950/80 border border-zinc-800 rounded-lg pl-9 pr-4 py-1.5 text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
      </div>

      {/* Pages List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-zinc-900/40 rounded-xl border border-zinc-800 animate-pulse" />
          ))}
        </div>
      ) : filteredPages.length === 0 ? (
        <Card className="text-center py-16 border-zinc-800/80 bg-zinc-950/40">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4 text-zinc-500 shadow-inner">
            <Files className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">No pages found</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-6">
            Build out your ecosystem structure with documentation and policy pages.
          </p>
          <Link href="/admin/pages/new">
            <Button variant="outline" size="sm">
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              Create First Page
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredPages.map((page) => {
            const parent = page.parent || pages.find((p) => p.id === page.parentId)
            return (
              <Card
                key={page.id}
                className="border-zinc-800/80 bg-zinc-950/60 hover:border-zinc-700/80 hover:bg-zinc-900/30 transition-all p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
              >
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={page.published ? 'success' : 'warning'} dot>
                      {page.published ? 'Live' : 'Draft'}
                    </Badge>
                    {page.showInNav && (
                      <Badge variant="sky" className="gap-1">
                        <Navigation className="w-2.5 h-2.5" /> Nav
                      </Badge>
                    )}
                    {parent && (
                      <span className="text-[10px] font-medium text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 flex items-center gap-1">
                        <FolderTree className="w-3 h-3 text-zinc-500" />
                        under {parent.title}
                      </span>
                    )}
                    {typeof page._count !== 'undefined' && page._count.children > 0 && (
                      <span className="text-[10px] font-semibold text-zinc-500">
                        ({page._count.children} subpage{page._count.children > 1 ? 's' : ''})
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/admin/pages/${page.id}`}
                    className="text-sm sm:text-base font-bold text-white group-hover:text-sky-400 transition-colors block truncate"
                  >
                    {page.title}
                  </Link>

                  <p className="font-mono text-[11px] text-zinc-500 truncate">
                    /pages/{page.slug}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <div className="flex flex-col bg-zinc-900/60 rounded border border-zinc-800">
                    <button
                      onClick={() => handleReorder(page.id, 'up')}
                      className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors rounded-t"
                      title="Move Up"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleReorder(page.id, 'down')}
                      className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors rounded-b"
                      title="Move Down"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {page.published && (
                    <Link href={`/pages/${page.slug}`} target="_blank">
                      <Button variant="ghost" size="icon" title="View Public Page">
                        <ExternalLink className="w-4 h-4 text-zinc-400 hover:text-white" />
                      </Button>
                    </Link>
                  )}

                  <Link href={`/admin/pages/${page.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="w-3.5 h-3.5 mr-1.5" />
                      Edit
                    </Button>
                  </Link>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                    onClick={() => handleDelete(page.id, page.title)}
                    title="Delete Page"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}