'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button, Input, Textarea, Card, Spinner, Modal } from '@/components/ui'
import { useToastContext } from '@/lib/providers/ToastProvider'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'
import AssetBrowser from '../../components/AssetBrowser'

interface ResearchPaper {
  id: string
  title: string
  slug: string
  abstract: string | null
  content: string
  pdfUrl: string | null
  published: boolean
  imageUrl: string | null
}

export default function AdminResearchEditPage() {
  const router = useRouter()
  const params = useParams()
  const { success, error } = useToastContext()
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [showPdfModal, setShowPdfModal] = useState(false)
  const [pdfUrl, setPdfUrl] = useState('')
  const [isParsing, setIsParsing] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [showAssetBrowser, setShowAssetBrowser] = useState(false)
  const [assetTarget, setAssetTarget] = useState<'image' | 'content'>('image')
  const [categories, setCategories] = useState<any[]>([])
  const [tags, setTags] = useState<any[]>([])
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    content: '',
    pdfUrl: '',
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
      fetchPaper()
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

    setIsUploading(true)
    try {
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)
      uploadFormData.append('type', 'research')

      const res = await fetch('/api/admin/upload-image', { // Reusing the same local upload API
        method: 'POST',
        body: uploadFormData,
      })

      if (res.ok) {
        const data = await res.json()
        setFormData(prev => ({ ...prev, pdfUrl: data.url }))
        success('PDF uploaded successfully!')
      } else {
        const data = await res.json()
        error(data.error || 'Failed to upload PDF')
      }
    } catch (err) {
      error('An error occurred during upload')
    } finally {
      setIsUploading(false)
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
      uploadFormData.append('type', 'research')

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

  const fetchPaper = async () => {
    setIsFetching(true)
    try {
      const res = await fetch(`/api/research/${params.id}`)
      if (res.ok) {
        const paper: any = await res.json()
        setFormData({
          title: paper.title,
          abstract: paper.abstract || '',
          content: paper.content || '',
          pdfUrl: paper.pdfUrl || '',
          published: paper.published,
          imageUrl: paper.imageUrl || '',
          imageDisplay: paper.imageDisplay || 'cover',
          categoryId: paper.categoryId || '',
          tags: paper.tags?.map((t: any) => t.id) || [],
        })
      } else {
        error('Failed to load research paper')
        router.push('/admin/research')
      }
    } catch (err) {
      error('Failed to load research paper')
      router.push('/admin/research')
    } finally {
      setIsFetching(false)
    }
  }

  const handleAssetSelect = (url: string) => {
    if (assetTarget === 'image') {
      setFormData(prev => ({ ...prev, imageUrl: url }))
    } else {
      setFormData(prev => ({ ...prev, content: (prev.content || '') + `\n\n![Image](${url})` }))
    }
    setShowAssetBrowser(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = isEdit ? `/api/research/${params.id}` : '/api/research'
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        success(isEdit ? 'Research paper updated' : 'Research paper created')
        router.push('/admin/research')
      } else {
        const data = await res.json()
        error(data.error || 'Failed to save research paper')
      }
    } catch (err) {
      error('Failed to save research paper')
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
            {isEdit ? 'Refine Publication' : 'New Research Entry'}
          </h1>
          <p className="text-dark-400">Manage technical papers and metrics</p>
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
            {isLoading ? <Spinner size="sm" /> : 'Save Paper'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-dark-900/40 border-white/5">
            <Input
              label="Paper Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Distributed Consensus in Intent-Driven Networks"
              required
              className="text-lg font-bold"
            />
          </Card>

           <Card className="bg-dark-900/40 border-white/5">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-black uppercase tracking-widest text-dark-500">Technical Content</label>
              <Button 
                type="button" 
                size="sm" 
                variant="ghost" 
                className="text-[10px] uppercase tracking-widest text-accent-400"
                onClick={() => {
                  setAssetTarget('content')
                  setShowAssetBrowser(true)
                }}
               >
                 Insert Media
               </Button>
            </div>

            {previewMode ? (
              <div className="prose prose-invert max-w-none min-h-[500px] p-6 bg-dark-950/50 rounded-2xl border border-white/5 shadow-inner">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {formData.content || '*No content provided*'}
                </ReactMarkdown>
              </div>
            ) : (
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Methodology, Architecture, Theorems..."
                rows={25}
                className="font-mono text-sm bg-dark-950/50 border-white/5 focus:border-primary-500/30"
              />
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="bg-dark-900/40 border-white/5">
            <h3 className="text-sm font-black uppercase tracking-widest text-dark-500 mb-4">Publication Meta</h3>
            
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
                <label className="text-xs font-bold text-dark-400 mb-2 block">Visibility</label>
                <div className="flex items-center gap-3 p-3 bg-dark-950/50 rounded-xl border border-white/5">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-4 h-4 rounded border-dark-600 bg-dark-800 text-primary-500"
                  />
                  <label htmlFor="published" className="text-sm text-dark-300 cursor-pointer">Live on Portal</label>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-dark-900/40 border-white/5">
             <h3 className="text-sm font-black uppercase tracking-widest text-dark-500 mb-4">PDF Document</h3>
             {formData.pdfUrl ? (
               <div className="space-y-3">
                 <div className="flex items-center justify-between p-3 bg-primary-500/5 rounded-xl border border-primary-500/10">
                   <div className="flex items-center">
                     <svg className="w-5 h-5 text-primary-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                     </svg>
                     <span className="text-xs text-white truncate max-w-[120px]">Asset Linked</span>
                   </div>
                   <button 
                     type="button" 
                     onClick={() => setFormData({...formData, pdfUrl: ''})}
                     className="text-xs text-red-400 hover:text-red-300"
                   >
                     Remove
                   </button>
                 </div>
                 <Link href={formData.pdfUrl} target="_blank" className="text-[10px] text-dark-500 hover:text-primary-400 block text-center truncate">
                   {formData.pdfUrl}
                 </Link>
               </div>
             ) : (
                <div className="relative group">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handlePdfUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                    disabled={isUploading}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full glass group-hover:bg-primary-500/5"
                    disabled={isUploading}
                  >
                    {isUploading ? <Spinner size="sm" /> : 'Upload PDF'}
                  </Button>
                </div>
             )}
          </Card>

          <Card className="bg-dark-900/40 border-white/5">
            <Textarea
              label="Executive Summary"
              value={formData.abstract}
              onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
              placeholder="Abstract for display cards..."
              rows={5}
              className="text-xs"
            />
          </Card>

          <Card className="bg-dark-900/40 border-white/5">
            <h3 className="text-sm font-black uppercase tracking-widest text-dark-500 mb-4">Header Image</h3>
            {formData.imageUrl ? (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group">
                <img src={formData.imageUrl} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, imageUrl: '' })}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                >
                  Remove Asset
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <div className="relative group flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <Button variant="outline" className="w-full glass">Upload</Button>
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="glass flex-1"
                  onClick={() => {
                    setAssetTarget('image')
                    setShowAssetBrowser(true)
                  }}
                >
                  Library
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

      <Modal 
        isOpen={showAssetBrowser} 
        onClose={() => setShowAssetBrowser(false)}
        title="Technical Assets"
        size="xl"
      >
        <AssetBrowser onSelect={handleAssetSelect} category="research" />
      </Modal>
    </form>
  </div>
</div>
  )
}
