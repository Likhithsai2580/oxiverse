'use client'

import React, { useEffect, useState, useMemo } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Input,
  Textarea,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/admin/ui'
import { useToastContext } from '@/lib/providers/ToastProvider'
import {
  Sliders,
  Plus,
  Trash2,
  Tag as TagIcon,
  Folder,
  Search,
  CheckCircle2,
} from 'lucide-react'

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
}

interface Tag {
  id: string
  name: string
  slug: string
}

export default function AdminSettingsPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('categories')
  const [search, setSearch] = useState('')
  const { success, error } = useToastContext()

  const [newCat, setNewCat] = useState({ name: '', slug: '', description: '' })
  const [newTag, setNewTag] = useState({ name: '', slug: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const [catRes, tagRes] = await Promise.all([
        fetch('/api/admin/categories'),
        fetch('/api/admin/tags'),
      ])
      if (catRes.ok && tagRes.ok) {
        setCategories(await catRes.json())
        setTags(await tagRes.json())
      }
    } catch (err) {
      error('Failed to load taxonomy data')
    } finally {
      setIsLoading(false)
    }
  }

  const slugify = (text: string) =>
    text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCat.name.trim()) return

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCat),
      })
      if (res.ok) {
        const data = await res.json()
        setCategories((prev) => [...prev, data])
        setNewCat({ name: '', slug: '', description: '' })
        success('Category created successfully')
      } else {
        error('Failed to add category')
      }
    } catch (err) {
      error('Failed to add category')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddTag = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTag.name.trim()) return

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/admin/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTag),
      })
      if (res.ok) {
        const data = await res.json()
        setTags((prev) => [...prev, data])
        setNewTag({ name: '', slug: '' })
        success('Tag registered successfully')
      } else {
        error('Failed to add tag')
      }
    } catch (err) {
      error('Failed to add tag')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return
    try {
      const res = await fetch(`/api/admin/categories?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setCategories((prev) => prev.filter((c) => c.id !== id))
        success('Category deleted')
      }
    } catch (err) {
      error('Delete failed')
    }
  }

  const handleDeleteTag = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tag?')) return
    try {
      const res = await fetch(`/api/admin/tags?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setTags((prev) => prev.filter((t) => t.id !== id))
        success('Tag deleted')
      }
    } catch (err) {
      error('Delete failed')
    }
  }

  const filteredCategories = useMemo(() => {
    return categories.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.slug.toLowerCase().includes(search.toLowerCase())
    )
  }, [categories, search])

  const filteredTags = useMemo(() => {
    return tags.filter(
      (t) =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.slug.toLowerCase().includes(search.toLowerCase())
    )
  }, [tags, search])

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6 pb-24">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          System Settings & Taxonomy
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Configure classification categories, index tags, and editorial parameters.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="categories" className="gap-1.5">
            <Folder className="w-3.5 h-3.5" />
            Categories ({categories.length})
          </TabsTrigger>
          <TabsTrigger value="tags" className="gap-1.5">
            <TagIcon className="w-3.5 h-3.5" />
            Tags ({tags.length})
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="categories">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Add Category Form (5 cols) */}
              <div className="lg:col-span-5">
                <Card className="p-5 border-zinc-800/80 bg-zinc-950/70 space-y-4 sticky top-20">
                  <div className="border-b border-zinc-800/80 pb-3">
                    <CardTitle className="text-sm">Create New Category</CardTitle>
                    <CardDescription>Define a top-level category for blog and research</CardDescription>
                  </div>

                  <form onSubmit={handleAddCategory} className="space-y-4">
                    <Input
                      label="Category Name"
                      value={newCat.name}
                      onChange={(e) => {
                        const name = e.target.value
                        setNewCat((prev) => ({
                          ...prev,
                          name,
                          slug: slugify(name),
                        }))
                      }}
                      placeholder="e.g. Cognitive Systems"
                      required
                    />

                    <Input
                      label="URL Slug"
                      value={newCat.slug}
                      onChange={(e) => setNewCat({ ...newCat, slug: slugify(e.target.value) })}
                      placeholder="cognitive-systems"
                      required
                      className="font-mono text-xs"
                    />

                    <Textarea
                      label="Description (Optional)"
                      value={newCat.description}
                      onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
                      placeholder="Articles relating to architecture, models, and agents..."
                      rows={3}
                      className="text-xs"
                    />

                    <Button type="submit" variant="accent" size="sm" className="w-full font-bold" isLoading={isSubmitting}>
                      <Plus className="w-3.5 h-3.5 mr-1.5" />
                      Add Category
                    </Button>
                  </form>
                </Card>
              </div>

              {/* Categories Table (7 cols) */}
              <div className="lg:col-span-7">
                <Card className="border-zinc-800/80 bg-zinc-950/70 overflow-hidden">
                  <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-500" />
                      <input
                        type="text"
                        placeholder="Filter categories..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <div className="divide-y divide-zinc-800/60 max-h-[500px] overflow-y-auto">
                    {filteredCategories.length === 0 ? (
                      <div className="p-8 text-center text-zinc-500 text-xs italic">
                        No categories found.
                      </div>
                    ) : (
                      filteredCategories.map((cat) => (
                        <div
                          key={cat.id}
                          className="p-4 hover:bg-zinc-900/40 transition-colors flex items-center justify-between gap-4 group"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-white">{cat.name}</p>
                            <p className="font-mono text-[10px] text-zinc-500">{cat.slug}</p>
                            {cat.description && (
                              <p className="text-[11px] text-zinc-400 mt-1 line-clamp-1">
                                {cat.description}
                              </p>
                            )}
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleDeleteCategory(cat.id)}
                            title="Delete Category"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tags">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Add Tag Form (5 cols) */}
              <div className="lg:col-span-5">
                <Card className="p-5 border-zinc-800/80 bg-zinc-950/70 space-y-4 sticky top-20">
                  <div className="border-b border-zinc-800/80 pb-3">
                    <CardTitle className="text-sm">Register New Tag</CardTitle>
                    <CardDescription>Add metadata tags for paper and blog indexing</CardDescription>
                  </div>

                  <form onSubmit={handleAddTag} className="space-y-4">
                    <Input
                      label="Tag Label"
                      value={newTag.name}
                      onChange={(e) => {
                        const name = e.target.value
                        setNewTag({
                          name,
                          slug: slugify(name),
                        })
                      }}
                      placeholder="e.g. LLM Reasoning"
                      required
                    />

                    <Input
                      label="Index Slug"
                      value={newTag.slug}
                      onChange={(e) => setNewTag({ ...newTag, slug: slugify(e.target.value) })}
                      placeholder="llm-reasoning"
                      required
                      className="font-mono text-xs"
                    />

                    <Button type="submit" variant="accent" size="sm" className="w-full font-bold" isLoading={isSubmitting}>
                      <Plus className="w-3.5 h-3.5 mr-1.5" />
                      Register Tag
                    </Button>
                  </form>
                </Card>
              </div>

              {/* Tags Table (7 cols) */}
              <div className="lg:col-span-7">
                <Card className="border-zinc-800/80 bg-zinc-950/70 overflow-hidden">
                  <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-500" />
                      <input
                        type="text"
                        placeholder="Filter tags..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <div className="divide-y divide-zinc-800/60 max-h-[500px] overflow-y-auto">
                    {filteredTags.length === 0 ? (
                      <div className="p-8 text-center text-zinc-500 text-xs italic">
                        No tags found.
                      </div>
                    ) : (
                      filteredTags.map((tag) => (
                        <div
                          key={tag.id}
                          className="p-4 hover:bg-zinc-900/40 transition-colors flex items-center justify-between gap-4 group"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-white">{tag.name}</p>
                            <p className="font-mono text-[10px] text-zinc-500">{tag.slug}</p>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleDeleteTag(tag.id)}
                            title="Delete Tag"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
