'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Input,
  Textarea,
  Badge,
  Dialog,
} from '@/components/admin/ui'
import { useToastContext } from '@/lib/providers/ToastProvider'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import AssetBrowser from '../../components/AssetBrowser'
import Mermaid from '@/components/Mermaid'
import {
  Save,
  Eye,
  Edit3,
  Image as ImageIcon,
  Heading,
  Bold,
  Italic,
  Code,
  List,
  Quote,
  ArrowLeft,
  Trash2,
  Navigation,
} from 'lucide-react'
import Link from 'next/link'

interface CmsPage {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  published: boolean
  order: number
  parentId: string | null
  showInNav: boolean
  navLabel: string | null
  imageUrl: string | null
  imageDisplay: string
  metaTitle: string | null
  metaDescription: string | null
}

export default function AdminPageEditor() {
  const router = useRouter()
  const params = useParams()
  const { success, error } = useToastContext()
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [showAssetBrowser, setShowAssetBrowser] = useState(false)
  const [assetTarget, setAssetTarget] = useState<'image' | 'content'>('image')
  const [pages, setPages] = useState<CmsPage[]>([])

  const isEdit = params.id !== 'new'

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    published: false,
    order: 0,
    parentId: '',
    showInNav: false,
    navLabel: '',
    imageUrl: '',
    imageDisplay: 'cover',
    metaTitle: '',
    metaDescription: '',
  })

  useEffect(() => {
    fetchPages()
    if (isEdit) {
      fetchPage()
    }
  }, [isEdit])

  const slugify = (str: string) =>
    str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setFormData((prev) => ({
      ...prev,
      title,
      slug: isEdit ? prev.slug : slugify(title),
    }))
  }

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/admin/pages')
      if (res.ok) {
        const data = await res.json()
        setPages(data.filter((p: CmsPage) => p.id !== params.id))
      }
    } catch (err) {
      console.error('Failed to load pages')
    }
  }

  const fetchPage = async () => {
    setIsFetching(true)
    try {
      const res = await fetch(`/api/admin/pages/${params.id}`)
      if (res.ok) {
        const page: CmsPage = await res.json()
        setFormData({
          title: page.title || '',
          slug: page.slug || '',
          excerpt: page.excerpt || '',
          content: page.content || '',
          published: page.published || false,
          order: page.order || 0,
          parentId: page.parentId || '',
          showInNav: page.showInNav || false,
          navLabel: page.navLabel || '',
          imageUrl: page.imageUrl || '',
          imageDisplay: page.imageDisplay || 'cover',
          metaTitle: page.metaTitle || '',
          metaDescription: page.metaDescription || '',
        })
      } else {
        error('Failed to load page')
        router.push('/admin/pages')
      }
    } catch (err) {
      error('Failed to load page')
      router.push('/admin/pages')
    } finally {
      setIsFetching(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 4.5 * 1024 * 1024) {
      error('Image size exceeds 4.5MB limit.')
      e.target.value = ''
      return
    }

    setIsUploading(true)
    try {
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)
      uploadFormData.append('type', 'pages')

      const res = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: uploadFormData,
      })

      if (res.ok) {
        const data = await res.json()
        setFormData((prev) => ({ ...prev, imageUrl: data.url }))
        success('Header image uploaded!')
      } else {
        const data = await res.json()
        error(data.error || 'Failed to upload image')
      }
    } catch (err) {
      error('An error occurred while uploading image')
    } finally {
      setIsUploading(false)
      e.target.value = ''
    }
  }

  const handleAssetSelect = (url: string) => {
    if (assetTarget === 'image') {
      setFormData((prev) => ({ ...prev, imageUrl: url }))
    } else {
      setFormData((prev) => ({ ...prev, content: (prev.content || '') + `\n\n![Image](${url})\n` }))
    }
    setShowAssetBrowser(false)
  }

  const insertMarkdownSyntax = (prefix: string, suffix: string = '') => {
    setFormData((prev) => ({
      ...prev,
      content: (prev.content || '') + `\n${prefix}content${suffix}\n`,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      error('Title is required')
      return
    }
    if (!formData.slug.trim()) {
      error('Slug is required')
      return
    }

    setIsLoading(true)
    try {
      const url = isEdit ? `/api/admin/pages/${params.id}` : '/api/admin/pages'
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          parentId: formData.parentId || null,
          navLabel: formData.navLabel || null,
          imageUrl: formData.imageUrl || null,
          metaTitle: formData.metaTitle || null,
          metaDescription: formData.metaDescription || null,
        }),
      })

      if (res.ok) {
        success(isEdit ? 'Page updated' : 'Page created')
        router.push('/admin/pages')
      } else {
        const data = await res.json()
        error(data.error || 'Failed to save page')
      }
    } catch (err) {
      error('Failed to save page')
    } finally {
      setIsLoading(false)
    }
  }

  if (isFetching) {
    return (
      <div className="p-12 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3 text-zinc-400">
          <div className="w-8 h-8 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
          <p className="text-xs">Loading page content...</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6 pb-24">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
        <div className="flex items-center gap-3">
          <Link href="/admin/pages">
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {isEdit ? 'Edit Page' : 'New Static Page'}
            </h1>
            <p className="text-xs text-zinc-400">Manage structure, routing, and body content</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setPreviewMode(!previewMode)}
          >
            {previewMode ? (
              <>
                <Edit3 className="w-3.5 h-3.5 mr-1.5" />
                Edit
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 mr-1.5" />
                Preview
              </>
            )}
          </Button>

          <Button type="submit" variant="accent" size="sm" isLoading={isLoading} className="font-bold">
            <Save className="w-3.5 h-3.5 mr-1.5" />
            Save Page
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-5 border-zinc-800/80 bg-zinc-950/70 space-y-4">
            <Input
              label="Page Title"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="e.g. Terms of Service, Ecosystem Overview"
              required
              className="text-base font-bold"
            />

            <div>
              <label className="text-xs font-semibold text-zinc-300 mb-1.5 block">Route Path</label>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-zinc-500 bg-zinc-900 px-2.5 py-1.5 rounded-lg border border-zinc-800">
                  /pages/
                </span>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: slugify(e.target.value) })}
                  placeholder="slug"
                  required
                  className="font-mono text-xs"
                />
              </div>
            </div>
          </Card>

          <Card className="p-5 border-zinc-800/80 bg-zinc-950/70 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <span className="text-xs font-bold text-zinc-300">Page Body (Markdown)</span>

              {!previewMode && (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => insertMarkdownSyntax('## ')}
                    className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800"
                    title="Heading"
                  >
                    <Heading className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdownSyntax('**', '**')}
                    className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800"
                    title="Bold"
                  >
                    <Bold className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdownSyntax('*', '*')}
                    className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800"
                    title="Italic"
                  >
                    <Italic className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdownSyntax('```ts\n', '\n```')}
                    className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800"
                    title="Code"
                  >
                    <Code className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdownSyntax('- ')}
                    className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800"
                    title="List"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAssetTarget('content')
                      setShowAssetBrowser(true)
                    }}
                    className="p-1.5 text-sky-400 hover:text-sky-300 rounded hover:bg-zinc-800"
                    title="Insert Media"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {previewMode ? (
              <div className="prose prose-invert max-w-none min-h-[450px] p-6 bg-zinc-950/80 rounded-xl border border-zinc-800 text-xs sm:text-sm leading-relaxed">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {formData.content || '*No content written yet...*'}
                </ReactMarkdown>
              </div>
            ) : (
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write page content in Markdown..."
                rows={22}
                className="font-mono text-xs bg-zinc-950/80 border-zinc-800 focus-visible:ring-sky-500 leading-relaxed"
              />
            )}
          </Card>
        </div>

        {/* Sidebar Organization & SEO */}
        <div className="space-y-6">
          <Card className="p-5 border-zinc-800/80 bg-zinc-950/70 space-y-5">
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider border-b border-zinc-800/80 pb-2">
              Navigation & Structure
            </h3>

            <div>
              <label className="text-xs font-semibold text-zinc-300 mb-1.5 block">Parent Page</label>
              <select
                value={formData.parentId}
                onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                className="w-full bg-zinc-900/80 border border-zinc-800 text-zinc-100 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer"
              >
                <option value="">No Parent (Top Level)</option>
                {pages.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 mb-1.5 block">Sort Order</label>
              <Input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="text-xs"
              />
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-3 bg-zinc-900/50 rounded-lg border border-zinc-800/80">
                <div>
                  <p className="text-xs font-bold text-white">Live on Site</p>
                  <p className="text-[10px] text-zinc-400">Publicly accessible via URL</p>
                </div>
                <input
                  type="checkbox"
                  id="published-page-toggle"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-sky-500 focus:ring-sky-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-zinc-900/50 rounded-lg border border-zinc-800/80">
                <div>
                  <p className="text-xs font-bold text-white">Navigation Bar</p>
                  <p className="text-[10px] text-zinc-400">Show link in header menu</p>
                </div>
                <input
                  type="checkbox"
                  id="showInNav-toggle"
                  checked={formData.showInNav}
                  onChange={(e) => setFormData({ ...formData, showInNav: e.target.checked })}
                  className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-sky-500 focus:ring-sky-500 cursor-pointer"
                />
              </div>

              {formData.showInNav && (
                <Input
                  label="Nav Label (Optional)"
                  value={formData.navLabel}
                  onChange={(e) => setFormData({ ...formData, navLabel: e.target.value })}
                  placeholder="Defaults to Title"
                  className="text-xs"
                />
              )}
            </div>
          </Card>

          <Card className="p-5 border-zinc-800/80 bg-zinc-950/70 space-y-4">
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider border-b border-zinc-800/80 pb-2">
              SEO & OpenGraph
            </h3>

            <Input
              label="Meta Title"
              value={formData.metaTitle}
              onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
              placeholder={formData.title || 'Page title'}
              className="text-xs"
            />

            <Textarea
              label="Meta Description"
              value={formData.metaDescription}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
              placeholder="Search engine summary..."
              rows={3}
              className="text-xs"
            />
          </Card>
        </div>
      </div>

      {/* Asset Browser Dialog */}
      <Dialog
        isOpen={showAssetBrowser}
        onClose={() => setShowAssetBrowser(false)}
        title="Page Asset Library"
        size="xl"
      >
        <AssetBrowser onSelect={handleAssetSelect} category="pages" />
      </Dialog>
    </form>
  )
}