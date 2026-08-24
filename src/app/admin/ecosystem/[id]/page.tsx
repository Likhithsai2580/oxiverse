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
import AssetBrowser from '../../components/AssetBrowser'
import {
  Save,
  ArrowLeft,
  Trash2,
  Image as ImageIcon,
  Network,
} from 'lucide-react'
import Link from 'next/link'

export default function AdminProjectEditPage() {
  const router = useRouter()
  const params = useParams()
  const { success, error } = useToastContext()
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [showAssetBrowser, setShowAssetBrowser] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    status: 'current',
    link: '',
    hostedUrl: '',
    imageUrl: '',
    imageDisplay: 'cover',
  })

  const isEdit = params.id !== 'new'

  useEffect(() => {
    if (isEdit) {
      fetchProject()
    }
  }, [isEdit])

  const fetchProject = async () => {
    setIsFetching(true)
    try {
      const res = await fetch(`/api/admin/ecosystem/${params.id}`)
      if (res.ok) {
        const project = await res.json()
        setFormData({
          title: project.title || '',
          slug: project.slug || '',
          description: project.description || '',
          status: project.status || 'current',
          link: project.link || '',
          hostedUrl: project.hostedUrl || '',
          imageUrl: project.imageUrl || '',
          imageDisplay: project.imageDisplay || 'cover',
        })
      } else {
        error('Failed to load project')
        router.push('/admin/ecosystem')
      }
    } catch (err) {
      error('Failed to load project')
      router.push('/admin/ecosystem')
    } finally {
      setIsFetching(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 4.5 * 1024 * 1024) {
      error('Icon size exceeds 4.5MB limit.')
      e.target.value = ''
      return
    }

    setIsUploading(true)
    try {
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)
      uploadFormData.append('type', 'ecosystem')

      const res = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: uploadFormData,
      })

      if (res.ok) {
        const data = await res.json()
        setFormData((prev) => ({ ...prev, imageUrl: data.url }))
        success('Project icon uploaded!')
      } else {
        const data = await res.json()
        error(data.error || 'Failed to upload icon')
      }
    } catch (err) {
      error('An error occurred while uploading icon')
    } finally {
      setIsUploading(false)
      e.target.value = ''
    }
  }

  const handleAssetSelect = (url: string) => {
    setFormData((prev) => ({ ...prev, imageUrl: url }))
    setShowAssetBrowser(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      error('Project title is required')
      return
    }
    if (!formData.slug.trim()) {
      error('Project slug identifier is required')
      return
    }

    setIsLoading(true)
    try {
      const url = isEdit ? `/api/admin/ecosystem/${params.id}` : '/api/admin/ecosystem'
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        success(isEdit ? 'Project node updated' : 'Project node registered')
        router.push('/admin/ecosystem')
      } else {
        const data = await res.json()
        error(data.error || 'Failed to save project')
      }
    } catch (err) {
      error('Failed to save project')
    } finally {
      setIsLoading(false)
    }
  }

  if (isFetching) {
    return (
      <div className="p-12 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3 text-zinc-400">
          <div className="w-8 h-8 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
          <p className="text-xs">Loading node specifications...</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-8 max-w-5xl mx-auto space-y-6 pb-24">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
        <div className="flex items-center gap-3">
          <Link href="/admin/ecosystem">
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {isEdit ? 'Refine Ecosystem Node' : 'Register Ecosystem Node'}
            </h1>
            <p className="text-xs text-zinc-400">Configure parameters, external links, and visual branding</p>
          </div>
        </div>

        <Button type="submit" variant="accent" size="sm" isLoading={isLoading} className="font-bold">
          <Save className="w-3.5 h-3.5 mr-1.5" />
          Save Project
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-5 border-zinc-800/80 bg-zinc-950/70 space-y-4">
            <Input
              label="Project Name"
              value={formData.title}
              onChange={(e) => {
                const title = e.target.value
                const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                setFormData((prev) => ({
                  ...prev,
                  title,
                  slug: isEdit ? prev.slug : slug,
                }))
              }}
              placeholder="e.g. Memory Engine Protocol"
              required
              className="text-base font-bold"
            />

            <div>
              <label className="text-xs font-semibold text-zinc-300 mb-1.5 block">Unique Slug Identifier</label>
              <Input
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="memory-engine"
                required
                className="font-mono text-xs"
              />
            </div>
          </Card>

          <Card className="p-5 border-zinc-800/80 bg-zinc-950/70 space-y-4">
            <Textarea
              label="Project Description & Overview"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Architectural summary, core mechanisms, and capabilities of this node..."
              rows={6}
              className="text-xs leading-relaxed"
            />
          </Card>

          <Card className="p-5 border-zinc-800/80 bg-zinc-950/70 space-y-4">
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider border-b border-zinc-800/80 pb-2">
              Endpoints & External Links
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Hosted Web App URL"
                value={formData.hostedUrl}
                onChange={(e) => setFormData({ ...formData, hostedUrl: e.target.value })}
                placeholder="https://app.oxiverse.com"
                className="font-mono text-xs"
              />

              <Input
                label="Repository / Documentation URL"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="https://github.com/..."
                className="font-mono text-xs"
              />
            </div>
          </Card>
        </div>

        {/* Sidebar Status & Icon (1 col) */}
        <div className="space-y-6">
          <Card className="p-5 border-zinc-800/80 bg-zinc-950/70 space-y-4">
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider border-b border-zinc-800/80 pb-2">
              Node Lifecycle
            </h3>

            <div>
              <label className="text-xs font-semibold text-zinc-300 mb-1.5 block">Development Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-zinc-900/80 border border-zinc-800 text-zinc-100 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer"
              >
                <option value="current">Current (Active in Production)</option>
                <option value="upcoming">Upcoming (In Active Development)</option>
                <option value="future">Future (Planned Architecture)</option>
              </select>
            </div>
          </Card>

          <Card className="p-5 border-zinc-800/80 bg-zinc-950/70 space-y-4">
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider border-b border-zinc-800/80 pb-2">
              Brand Icon / Logo
            </h3>

            {formData.imageUrl ? (
              <div className="relative aspect-square w-32 mx-auto rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 p-2 group">
                <img src={formData.imageUrl} className="w-full h-full object-contain" alt="Project Icon" />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, imageUrl: '' })}
                  className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-bold text-rose-400 gap-1"
                >
                  <Trash2 className="w-4 h-4" /> Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <label className="relative flex-1">
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/gif, image/webp, image/svg+xml"
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
                    Upload Icon
                  </Button>
                </label>
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setShowAssetBrowser(true)}
                >
                  Library
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Asset Browser Modal */}
      <Dialog
        isOpen={showAssetBrowser}
        onClose={() => setShowAssetBrowser(false)}
        title="Ecosystem Media Library"
        size="xl"
      >
        <AssetBrowser onSelect={handleAssetSelect} category="ecosystem" />
      </Dialog>
    </form>
  )
}
