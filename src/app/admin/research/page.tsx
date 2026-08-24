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
  GraduationCap,
  Plus,
  Search,
  Trash2,
  Edit,
  ExternalLink,
  FileText,
  Clock,
  User,
} from 'lucide-react'

interface ResearchPaper {
  id: string
  title: string
  slug: string
  abstract: string | null
  pdfUrl: string | null
  published: boolean
  publishedAt: string | null
  createdAt: string
  category?: { name: string }
  author: {
    id: string
    name: string | null
    email: string
  }
}

export default function AdminResearchPage() {
  const { success, error } = useToastContext()
  const [papers, setPapers] = useState<ResearchPaper[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all')

  useEffect(() => {
    fetchPapers()
  }, [])

  const fetchPapers = async () => {
    try {
      const res = await fetch('/api/research')
      const data = await res.json()
      setPapers(data.papers || [])
    } catch (err) {
      error('Failed to load research papers')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return

    try {
      const res = await fetch(`/api/research/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setPapers((prev) => prev.filter((p) => p.id !== id))
        success('Research paper deleted successfully')
      } else {
        error('Failed to delete research paper')
      }
    } catch (err) {
      error('Failed to delete research paper')
    }
  }

  const filteredPapers = useMemo(() => {
    return papers.filter((paper) => {
      const matchesSearch =
        paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (paper.abstract && paper.abstract.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (paper.author.name && paper.author.name.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesStatus =
        statusFilter === 'all'
          ? true
          : statusFilter === 'published'
          ? paper.published
          : !paper.published

      return matchesSearch && matchesStatus
    })
  }, [papers, searchQuery, statusFilter])

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Theoretical & Systems Research
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Publish academic whitepapers, cognitive architectures, and technical specifications.
          </p>
        </div>

        <Link href="/admin/research/new">
          <Button variant="default" size="sm" className="font-bold">
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Publish Paper
          </Button>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-zinc-900/50 p-3 rounded-xl border border-zinc-800/80">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search papers by title, abstract, or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950/80 border border-zinc-800 rounded-lg pl-9 pr-4 py-1.5 text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-zinc-950/80 p-1 rounded-lg border border-zinc-800">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
              statusFilter === 'all'
                ? 'bg-zinc-800 text-white font-bold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            All ({papers.length})
          </button>
          <button
            onClick={() => setStatusFilter('published')}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
              statusFilter === 'published'
                ? 'bg-emerald-500/20 text-emerald-300 font-bold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Published ({papers.filter((p) => p.published).length})
          </button>
          <button
            onClick={() => setStatusFilter('draft')}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
              statusFilter === 'draft'
                ? 'bg-amber-500/20 text-amber-300 font-bold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Drafts ({papers.filter((p) => !p.published).length})
          </button>
        </div>
      </div>

      {/* Papers List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-zinc-900/40 rounded-xl border border-zinc-800 animate-pulse" />
          ))}
        </div>
      ) : filteredPapers.length === 0 ? (
        <Card className="text-center py-16 border-zinc-800/80 bg-zinc-950/40">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4 text-zinc-500 shadow-inner">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">No research papers found</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-6">
            {searchQuery
              ? 'No papers match your search parameters.'
              : 'Add your first research paper or import one from PDF.'}
          </p>
          <Link href="/admin/research/new">
            <Button variant="outline" size="sm">
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              Publish First Paper
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredPapers.map((paper) => (
            <Card
              key={paper.id}
              className="border-zinc-800/80 bg-zinc-950/60 hover:border-zinc-700/80 hover:bg-zinc-900/30 transition-all p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
            >
              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <Badge variant={paper.published ? 'success' : 'warning'} dot>
                    {paper.published ? 'Published' : 'Under Review'}
                  </Badge>
                  {paper.category && (
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                      {paper.category.name}
                    </span>
                  )}
                  {paper.pdfUrl && (
                    <span className="text-[10px] font-semibold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20 flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      PDF Attached
                    </span>
                  )}
                </div>

                <Link
                  href={`/admin/research/${paper.id}`}
                  className="text-sm sm:text-base font-bold text-white group-hover:text-sky-400 transition-colors block truncate"
                >
                  {paper.title}
                </Link>

                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {paper.abstract || 'No abstract provided for this research entry.'}
                </p>

                <div className="flex items-center gap-3 text-[11px] text-zinc-500 pt-0.5">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3 text-zinc-600" />
                    {paper.author.name || paper.author.email}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-zinc-600" />
                    {new Date(paper.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                {paper.published && (
                  <Link href={`/research/${paper.slug}`} target="_blank">
                    <Button variant="ghost" size="icon" title="View Public Paper">
                      <ExternalLink className="w-4 h-4 text-zinc-400 hover:text-white" />
                    </Button>
                  </Link>
                )}
                <Link href={`/admin/research/${paper.id}`}>
                  <Button variant="outline" size="sm">
                    <Edit className="w-3.5 h-3.5 mr-1.5" />
                    Refine
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                  onClick={() => handleDelete(paper.id, paper.title)}
                  title="Delete Paper"
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
