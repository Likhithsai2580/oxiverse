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
import PdfToMarkdownModal from '../../components/PdfToMarkdownModal'
import Mermaid from '@/components/Mermaid'
import {
  Save,
  Eye,
  Edit3,
  FileUp,
  Image as ImageIcon,
  Heading,
  Bold,
  Italic,
  Code,
  List,
  Quote,
  Link as LinkIcon,
  Sparkles,
  ArrowLeft,
  Trash2,
  CheckCircle,
} from 'lucide-react'
import Link from 'next/link'

export default function AdminBlogEditPage() {
  const router = useRouter()
  const params = useParams()
  const { success, error } = useToastContext()
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [showAssetBrowser, setShowAssetBrowser] = useState(false)
  const [showPdfModal, setShowPdfModal] = useState(false)
  const [assetTarget, setAssetTarget] = useState<'image' | 'content'>('image')

  const [categories, setCategories] = useState<any[]>([])
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    published: false,
    imageUrl: '',
    imageDisplay: 'cover',
    categoryId: '',
    tags: [] as string[],
  })

  const isEdit = params.id !== 'new'

  useEffect(() => {
    fetchTaxonomy()
    if (isEdit) {
      fetchPost()
    }
  }, [isEdit])

  const fetchTaxonomy = async () => {
    try {
      const catRes = await fetch('/api/admin/categories')
      if (catRes.ok) setCategories(await catRes.json())
    } catch (err) {
      console.error('Failed to load categories')
    }
  }

  const fetchPost = async () => {
    setIsFetching(true)
    try {
      const res = await fetch(`/api/blog/${params.id}`)
      if (res.ok) {
        const post = await res.json()
        setFormData({
          title: post.title || '',
          excerpt: post.excerpt || '',
          content: post.content || '',
          published: post.published || false,
          imageUrl: post.imageUrl || '',
          imageDisplay: post.imageDisplay || 'cover',
          categoryId: post.categoryId || '',
          tags: post.tags?.map((t: any) => t.id) || [],
        })
      } else {
        error('Failed to load blog post')
        router.push('/admin/blog')
      }
    } catch (err) {
      error('Failed to load blog post')
      router.push('/admin/blog')
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
      uploadFormData.append('type', 'blog')

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

  const handlePdfImport = ({ title, abstract, markdown }: { title?: string; abstract?: string; markdown: string }) => {
    setFormData((prev) => ({
      ...prev,
      title: prev.title.trim() ? prev.title : title || prev.title,
      excerpt: prev.excerpt.trim() ? prev.excerpt : abstract || prev.excerpt,
      content: markdown,
    }))
    success('PDF content imported and converted into Markdown!')
  }

  const insertMarkdownSyntax = (prefix: string, suffix: string = '') => {
    setFormData((prev) => ({
      ...prev,
      content: (prev.content || '') + `\n${prefix}text${suffix}\n`,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      error('Headline is required')
      return
    }
    if (!formData.content.trim()) {
      error('Content is required')
      return
    }

    setIsLoading(true)
    try {
      const url = isEdit ? `/api/blog/${params.id}` : '/api/blog'
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        success(isEdit ? 'Blog post updated successfully' : 'Blog post published')
        router.push('/admin/blog')
      } else {
        const data = await res.json()
        error(data.error || 'Failed to save post')
      }
    } catch (err) {
      error('Failed to save post')
    } finally {
      setIsLoading(false)
    }
  }

  if (isFetching) {
    return (
      <div className="p-12 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3 text-zinc-400">
          <div className="w-8 h-8 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
          <p className="text-xs">Loading post data...</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6 pb-24">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
        <div className="flex items-center gap-3">
          <Link href="/admin/blog">
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {isEdit ? 'Refine Post' : 'Compose Blog Entry'}
            </h1>
            <p className="text-xs text-zinc-400">Draft rich editorial pieces in Markdown</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowPdfModal(true)}
            className="border-sky-500/30 text-sky-400 hover:bg-sky-500/10"
          >
            <FileUp className="w-3.5 h-3.5 mr-1.5" />
            Import PDF
          </Button>

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
            Save Post
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-5 border-zinc-800/80 bg-zinc-950/70">
            <Input
              label="Article Headline"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Advancements in Intent Infrastructure"
              required
              className="text-base font-bold"
            />
          </Card>

          <Card className="p-5 border-zinc-800/80 bg-zinc-950/70 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <span className="text-xs font-bold text-zinc-300">Article Content</span>

              {/* Formatting Toolbar */}
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
                    title="Code Block"
                  >
                    <Code className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdownSyntax('- ')}
                    className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800"
                    title="Bullet List"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdownSyntax('> ')}
                    className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800"
                    title="Quote"
                  >
                    <Quote className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAssetTarget('content')
                      setShowAssetBrowser(true)
                    }}
                    className="p-1.5 text-sky-400 hover:text-sky-300 rounded hover:bg-zinc-800"
                    title="Insert Media Image"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {previewMode ? (
              <div className="prose prose-invert max-w-none min-h-[500px] p-6 bg-zinc-950/80 rounded-xl border border-zinc-800 text-xs sm:text-sm leading-relaxed">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code: ({ node, className, children, ...props }: any) => {
                      const match = /language-(\w+)/.exec(className || '')
                      if (match && match[1] === 'mermaid') {
                        return <Mermaid chart={String(children).replace(/\n$/, '')} />
                      }
                      return <code className={className} {...props}>{children}</code>
                    },
                  }}
                >
                  {formData.content || '*No content written yet...*'}
                </ReactMarkdown>
              </div>
            ) : (
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your article in Markdown. Headings, code blocks, tables, and lists are supported..."
                rows={24}
                className="font-mono text-xs bg-zinc-950/80 border-zinc-800 focus-visible:ring-sky-500 leading-relaxed"
              />
            )}
          </Card>
        </div>

        {/* Sidebar Metadata (1 Col) */}
        <div className="space-y-6">
          <Card className="p-5 border-zinc-800/80 bg-zinc-950/70 space-y-5">
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider border-b border-zinc-800/80 pb-2">
              Publication Settings
            </h3>

            <div>
              <label className="text-xs font-semibold text-zinc-300 mb-1.5 block">Category</label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full bg-zinc-900/80 border border-zinc-800 text-zinc-100 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer"
              >
                <option value="">Select a Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between p-3 bg-zinc-900/50 rounded-lg border border-zinc-800/80">
              <div>
                <p className="text-xs font-bold text-white">Publish Status</p>
                <p className="text-[10px] text-zinc-400">Make live on public website</p>
              </div>
              <input
                type="checkbox"
                id="published-toggle"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-sky-500 focus:ring-sky-500 cursor-pointer"
              />
            </div>
          </Card>

          <Card className="p-5 border-zinc-800/80 bg-zinc-950/70 space-y-3">
            <Textarea
              label="Article Summary / Teaser"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Short synopsis displayed in cards and SEO previews..."
              rows={4}
              className="text-xs"
            />
          </Card>

          <Card className="p-5 border-zinc-800/80 bg-zinc-950/70 space-y-4">
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider border-b border-zinc-800/80 pb-2">
              Featured Header Image
            </h3>

            {formData.imageUrl ? (
              <div className="relative aspect-video rounded-lg overflow-hidden border border-zinc-800 group">
                <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Featured header" />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, imageUrl: '' })}
                  className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-bold text-rose-400 gap-1.5"
                >
                  <Trash2 className="w-4 h-4" /> Remove Image
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <label className="relative flex-1">
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/gif, image/webp"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    disabled={isUploading}
                    isLoading={isUploading}
                    onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()}
                  >
                    Upload
                  </Button>
                </label>
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => {
                    setAssetTarget('image')
                    setShowAssetBrowser(true)
                  }}
                >
                  Media Library
                </Button>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-zinc-300 mb-1.5 block">Image Display Mode</label>
              <select
                value={formData.imageDisplay}
                onChange={(e) => setFormData({ ...formData, imageDisplay: e.target.value })}
                className="w-full bg-zinc-900/80 border border-zinc-800 text-zinc-100 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer"
              >
                <option value="cover">Cover (Fills area)</option>
                <option value="contain">Contain (Preserves aspect ratio)</option>
                <option value="fill">Fill (Stretches)</option>
              </select>
            </div>
          </Card>
        </div>
      </div>

      {/* Asset Browser Modal */}
      <Dialog
        isOpen={showAssetBrowser}
        onClose={() => setShowAssetBrowser(false)}
        title="Media Asset Library"
        size="xl"
      >
        <AssetBrowser onSelect={handleAssetSelect} category="blog" />
      </Dialog>

      {/* PDF to Markdown Parser Modal */}
      <PdfToMarkdownModal
        isOpen={showPdfModal}
        onClose={() => setShowPdfModal(false)}
        onImport={handlePdfImport}
      />
    </form>
  )
}
