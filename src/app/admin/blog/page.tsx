'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, Button, Skeleton } from '@/components/ui'
import { useToastContext } from '@/lib/providers/ToastProvider'

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
  const { success, error } = useToastContext()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blog')
      const data = await res.json()
      setBlogs(data.blogs)
    } catch (err) {
      error('Failed to load blog posts')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return

    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setBlogs(blogs.filter((b) => b.id !== id))
        success('Blog post deleted successfully')
      } else {
        error('Failed to delete blog post')
      }
    } catch (err) {
      error('Failed to delete blog post')
    }
  }

  return (
    <div className="p-8 pb-20">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight font-display">Public Journals</h1>
          <p className="text-dark-400">Chronicles of our engineering journey</p>
        </div>
        <Link href="/admin/blog/new">
          <Button variant="primary" size="lg" className="shadow-lg shadow-primary-500/20">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Compose Post
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="bg-dark-900/40 border-white/5 p-0 overflow-hidden">
                <div className="flex flex-col md:flex-row items-stretch">
                    <div className="p-6 flex-1 space-y-4">
                        <div className="flex gap-2">
                            <Skeleton className="h-4 w-12" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <div className="flex gap-4">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>
                    <div className="p-6 md:border-l border-white/5 flex items-center gap-3 bg-dark-950/20">
                        <Skeleton className="h-9 w-20" />
                        <Skeleton className="h-9 w-9" />
                    </div>
                </div>
            </Card>
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <Card variant="glass" className="bg-dark-900/40 border-white/5 py-16 text-center">
            <div className="w-20 h-20 bg-dark-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            </div>
          <h2 className="text-xl font-bold text-white mb-2">No chronicles yet</h2>
          <p className="text-dark-400 mb-8 max-w-sm mx-auto">Start sharing your insights and updates with the community.</p>
          <Link href="/admin/blog/new">
            <Button variant="outline" className="glass">Initial Post</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {blogs.map((blog) => (
            <Card key={blog.id} variant="glass" className="bg-dark-900/40 border-white/5 hover:border-primary-500/20 transition-all p-0 overflow-hidden group">
              <div className="flex flex-col md:flex-row items-stretch">
                <div className="p-6 flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${
                      blog.published 
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                        : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                    }`}>
                      {blog.published ? 'Live' : 'Draft'}
                    </span>
                    {blog.category && (
                        <span className="text-[10px] font-bold text-dark-500 uppercase tracking-widest">
                            {blog.category.name}
                        </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-dark-400 text-sm line-clamp-2 mb-4 leading-relaxed">
                    {blog.excerpt || 'No excerpt provided for this entry.'}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-dark-500">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-dark-800 flex items-center justify-center text-[10px] text-dark-400 border border-white/5 uppercase">
                        {blog.author.name?.[0] || blog.author.email[0]}
                      </div>
                      {blog.author.name || blog.author.email}
                    </div>
                    <span>•</span>
                    <span>{new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
                <div className="p-6 md:border-l border-white/5 flex items-center gap-3 bg-dark-950/20">
                  <Link href={`/admin/blog/${blog.id}`} className="flex-1 md:flex-none">
                    <Button variant="outline" size="sm" className="w-full glass">
                      Refine
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/5 px-2"
                    onClick={() => handleDelete(blog.id, blog.title)}
                  >
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                     </svg>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
