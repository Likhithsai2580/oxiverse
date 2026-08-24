'use client'

import React, { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Badge,
  Input,
} from '@/components/admin/ui'
import { useToastContext } from '@/lib/providers/ToastProvider'
import {
  BookOpen,
  Plus,
  GitBranch,
  Search,
  Trash2,
  Edit,
  ExternalLink,
  Filter,
  Clock,
  User,
  Loader2,
} from 'lucide-react'

interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string | null
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

export default function AdminBlogPage() {
  const router = useRouter()
  const { success, error } = useToastContext()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all')

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blog')
      const data = await res.json()
      setBlogs(data.blogs || [])
    } catch (err) {
      error('Failed to load blog posts')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerate = async () => {
    if (!confirm('Generate a descriptive engineering draft from recent oxiverse-ecosystem commits?')) return

    setIsGenerating(true)
    try {
      const res = await fetch('/api/admin/blog/generate', { method: 'POST' })
      const data = await res.json()
      if (res.ok) {
        success(`Draft created from ${data.commitCount} commits with detailed summaries!`)
        router.push(`/admin/blog/${data.id}`)
      } else {
        error(data.error || 'Failed to generate post')
      }
    } catch (err) {
      error('Failed to generate post from commits')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return

    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => b.id !== id))
        success('Blog post deleted successfully')
      } else {
        error('Failed to delete blog post')
      }
    } catch (err) {
      error('Failed to delete blog post')
    }
  }

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (blog.excerpt && blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (blog.author.name && blog.author.name.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesStatus =
        statusFilter === 'all'
          ? true
          : statusFilter === 'published'
          ? blog.published
          : !blog.published

      return matchesSearch && matchesStatus
    })
  }, [blogs, searchQuery, statusFilter])

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Blog & Technical Journals
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Publish engineering updates, release notes, and thought pieces.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={handleGenerate}
            disabled={isGenerating}
            isLoading={isGenerating}
          >
            <GitBranch className="w-3.5 h-3.5 mr-1.5 text-sky-400" />
            From Commits
          </Button>
          <Link href="/admin/blog/new">
            <Button variant="default" size="sm" className="font-bold">
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              Compose Post
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-zinc-900/50 p-3 rounded-xl border border-zinc-800/80">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search posts by title, excerpt, or author..."
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
            All ({blogs.length})
          </button>
          <button
            onClick={() => setStatusFilter('published')}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
              statusFilter === 'published'
                ? 'bg-emerald-500/20 text-emerald-300 font-bold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Published ({blogs.filter((b) => b.published).length})
          </button>
          <button
            onClick={() => setStatusFilter('draft')}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
              statusFilter === 'draft'
                ? 'bg-amber-500/20 text-amber-300 font-bold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Drafts ({blogs.filter((b) => !b.published).length})
          </button>
        </div>
      </div>

      {/* Posts List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-zinc-900/40 rounded-xl border border-zinc-800 animate-pulse" />
          ))}
        </div>
      ) : filteredBlogs.length === 0 ? (
        <Card className="text-center py-16 border-zinc-800/80 bg-zinc-950/40">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4 text-zinc-500 shadow-inner">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">No posts found</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-6">
            {searchQuery
              ? 'No blog entries match your search criteria.'
              : 'Create your first blog post or generate one from git commits.'}
          </p>
          <Link href="/admin/blog/new">
            <Button variant="outline" size="sm">
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              Write First Post
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredBlogs.map((blog) => (
            <Card
              key={blog.id}
              className="border-zinc-800/80 bg-zinc-950/60 hover:border-zinc-700/80 hover:bg-zinc-900/30 transition-all p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
            >
              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <Badge variant={blog.published ? 'success' : 'warning'} dot>
                    {blog.published ? 'Live' : 'Draft'}
                  </Badge>
                  {blog.category && (
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                      {blog.category.name}
                    </span>
                  )}
                </div>

                <Link
                  href={`/admin/blog/${blog.id}`}
                  className="text-sm sm:text-base font-bold text-white group-hover:text-sky-400 transition-colors block truncate"
                >
                  {blog.title}
                </Link>

                <p className="text-xs text-zinc-400 line-clamp-1">
                  {blog.excerpt || 'No summary excerpt provided for this post.'}
                </p>

                <div className="flex items-center gap-3 text-[11px] text-zinc-500 pt-0.5">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3 text-zinc-600" />
                    {blog.author.name || blog.author.email}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-zinc-600" />
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                {blog.published && (
                  <Link href={`/blog/${blog.slug}`} target="_blank">
                    <Button variant="ghost" size="icon" title="View Public Post">
                      <ExternalLink className="w-4 h-4 text-zinc-400 hover:text-white" />
                    </Button>
                  </Link>
                )}
                <Link href={`/admin/blog/${blog.id}`}>
                  <Button variant="outline" size="sm">
                    <Edit className="w-3.5 h-3.5 mr-1.5" />
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                  onClick={() => handleDelete(blog.id, blog.title)}
                  title="Delete Post"
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
