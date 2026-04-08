'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button, Input, Textarea, Card, Spinner } from '@/components/ui'
import { useToastContext } from '@/lib/providers/ToastProvider'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function AdminBlogEditPage() {
  const router = useRouter()
  const params = useParams()
  const { success, error } = useToastContext()
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [isParsing, setIsParsing] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  
  const [categories, setCategories] = useState<any[]>([])
  const [tags, setTags] = useState<any[]>([])
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
      const [catRes, tagRes] = await Promise.all([
        fetch('/api/admin/categories'),
        fetch('/api/admin/tags'),
      ])
      setCategories(await catRes.json())
      setTags(await tagRes.json())
    } catch (err) {
      console.error('Failed to load taxonomy')
    }
  }

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsParsing(true)
    
    try {
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)

      const res = await fetch('/api/admin/parse-pdf', {
        method: 'POST',
        body: uploadFormData,
      })

      if (res.ok) {
        const data = await res.json()
        setFormData(prev => ({
          ...prev,
          content: data.markdown,
          title: prev.title || data.info?.Title || file.name.replace('.pdf', '')
        }))
        success('PDF parsed successfully!')
      } else {
        const data = await res.json()
        error(data.error || 'Failed to parse PDF')
      }
    } catch (err) {
      error('An error occurred while parsing the PDF')
    } finally {
      setIsParsing(false)
      e.target.value = ''
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

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
        setFormData(prev => ({ ...prev, imageUrl: data.url }))
        success('Image uploaded successfully!')
      } else {
        const data = await res.json()
        error(data.error || 'Failed to upload image')
      }
    } catch (err) {
      error('An error occurred while uploading the image')
    } finally {
      setIsUploading(false)
      e.target.value = ''
    }
  }

  const fetchPost = async () => {
    setIsFetching(true)
    try {
      const res = await fetch(`/api/blog/${params.id}`)
      if (res.ok) {
        const post: any = await res.json()
        setFormData({
          title: post.title,
          excerpt: post.excerpt || '',
          content: post.content,
          published: post.published,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
        success(isEdit ? 'Post updated' : 'Post created')
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
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 pb-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {isEdit ? 'Refine Post' : 'New Journal Entry'}
          </h1>
          <p className="text-dark-400">Compose and organize your thoughts</p>
        </div>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setPreviewMode(!previewMode)}
          >
            {previewMode ? 'Edit' : 'Preview'}
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading} className="shadow-lg shadow-primary-500/20">
            {isLoading ? <Spinner size="sm" /> : 'Save Post'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-dark-900/40 border-white/5">
            <Input
              label="Headline"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="The Future of Distributed Intelligence..."
              required
              className="text-lg font-bold"
            />
          </Card>

          <Card className="bg-dark-900/40 border-white/5">
            <div className="flex items-center justify-between mb-4">
               <label className="text-sm font-black uppercase tracking-widest text-dark-500">Editorial Content</label>
            </div>

            {previewMode ? (
              <div className="prose prose-invert max-w-none min-h-[500px] p-6 bg-dark-950/50 rounded-2xl border border-white/5 shadow-inner">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {formData.content || '*Draft summary goes here...*'}
                </ReactMarkdown>
              </div>
            ) : (
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your story..."
                rows={25}
                className="font-mono text-sm bg-dark-950/50 border-white/5 focus:border-primary-500/30"
              />
            )}
            
            {!previewMode && (
              <div className="mt-4 text-[10px] text-dark-500 grid grid-cols-3 gap-2 uppercase tracking-tighter">
                <span># Headline</span>
                <span>**Bold**</span>
                <span>[Link](url)</span>
                <span>- List</span>
                <span>```Code```</span>
                <span>![Img](url)</span>
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="bg-dark-900/40 border-white/5">
            <h3 className="text-sm font-black uppercase tracking-widest text-dark-500 mb-4">Content Meta</h3>
            
            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-dark-400 mb-2 block">Primary Category</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full bg-dark-950 border border-white/5 text-white rounded-lg px-4 py-2 text-sm outline-none focus:border-primary-500/30"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

               <div>
                <label className="text-xs font-bold text-dark-400 mb-2 block">Post Visibility</label>
                <div className="flex items-center gap-3 p-3 bg-dark-950/50 rounded-xl border border-white/5">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-4 h-4 rounded border-dark-600 bg-dark-800 text-primary-500 focus:ring-primary-500"
                  />
                  <label htmlFor="published" className="text-sm text-dark-300 cursor-pointer">Live on Site</label>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-dark-900/40 border-white/5">
            <h3 className="text-sm font-black uppercase tracking-widest text-dark-500 mb-2">PDF Assistant</h3>
             <div className="relative group">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handlePdfUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                  disabled={isParsing}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full glass group-hover:bg-primary-500/5"
                  disabled={isParsing}
                >
                  {isParsing ? <Spinner size="sm" /> : 'Parse from PDF'}
                </Button>
              </div>
          </Card>

          <Card className="bg-dark-900/40 border-white/5">
            <Textarea
              label="Teaser / Excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Short description for cards..."
              rows={4}
              className="text-xs"
            />
          </Card>

          <Card className="bg-dark-900/40 border-white/5">
            <h3 className="text-sm font-black uppercase tracking-widest text-dark-500 mb-4">Post Graphics</h3>
            {formData.imageUrl ? (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group">
                <img src={formData.imageUrl} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, imageUrl: '' })}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                >
                  Clear Asset
                </button>
              </div>
            ) : (
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  disabled={isUploading}
                />
                <Button type="button" variant="outline" className="w-full glass" disabled={isUploading}>
                  {isUploading ? <Spinner size="sm" /> : 'Set Header Image'}
                </Button>
              </div>
            )}
            
            <div className="mt-4">
              <label className="text-xs font-bold text-dark-400 mb-2 block">Image Display Mode</label>
              <select
                value={formData.imageDisplay}
                onChange={(e) => setFormData({ ...formData, imageDisplay: e.target.value })}
                className="w-full bg-dark-950 border border-white/5 text-white rounded-lg px-4 py-2 text-sm outline-none focus:border-primary-500/30"
              >
                <option value="cover">Cover (Fills area, may crop)</option>
                <option value="contain">Contain (Fits area, preserves aspect ratio)</option>
                <option value="fill">Fill (Stretches to fill area)</option>
              </select>
            </div>
          </Card>
        </div>
      </div>
    </form>
  )
}
