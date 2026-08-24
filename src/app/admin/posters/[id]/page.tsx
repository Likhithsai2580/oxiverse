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
  Dialog,
} from '@/components/admin/ui'
import { useToastContext } from '@/lib/providers/ToastProvider'
import AssetBrowser from '../../components/AssetBrowser'
import {
  Save,
  ArrowLeft,
  Trash2,
  Image as ImageIcon,
  ExternalLink,
} from 'lucide-react'
import Link from 'next/link'

export default function AdminPosterEditPage() {
  const router = useRouter()
  const params = useParams()
  const { success, error } = useToastContext()
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [showAssetBrowser, setShowAssetBrowser] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    link: '',
  })

  const isEdit = params.id !== 'new'

  useEffect(() => {
    if (isEdit) {
      fetchPoster()
    }
  }, [isEdit])

  const fetchPoster = async () => {
    setIsFetching(true)
    try {
      const res = await fetch(`/api/posters/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        setFormData({
          title: data.title || '',
          imageUrl: data.imageUrl || '',
          link: data.link || '',
        })
      } else {
        error('Failed to load poster')
        router.push('/admin/posters')
      }
    } catch (err) {
      error('Failed to load poster')
      router.push('/admin/posters')
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
      uploadFormData.append('type', 'posters')

      const res = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: uploadFormData,
      })

      if (res.ok) {
        const data = await res.json()
        setFormData((prev) => ({ ...prev, imageUrl: data.url }))
        success('Poster image uploaded!')
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
    setFormData((prev) => ({ ...prev, imageUrl: url }))
    setShowAssetBrowser(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      error('Poster title is required')
      return
    }
    if (!formData.imageUrl.trim()) {
      error('Poster image is required')
      return
    }

    setIsLoading(true)
    try {
      const url = isEdit ? `/api/posters/${params.id}` : '/api/posters'
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        success(isEdit ? 'Poster updated' : 'Poster created')
        router.push('/admin/posters')
      } else {
        const data = await res.json()
        error(data.error || 'Failed to save poster')
      }
    } catch (err) {
      error('Failed to save poster')
    } finally {
      setIsLoading(false)
    }
  }

  if (isFetching) {
    return (
      <div className="p-12 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3 text-zinc-400">
          <div className="w-8 h-8 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
          <p className="text-xs">Loading poster details...</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-8 max-w-5xl mx-auto space-y-6 pb-24">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
        <div className="flex items-center gap-3">
          <Link href="/admin/posters">
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {isEdit ? 'Edit Visual Poster' : 'New Visual Artifact'}
            </h1>
            <p className="text-xs text-zinc-400">Manage promotional posters and gallery graphics</p>
          </div>
        </div>

        <Button type="submit" variant="accent" size="sm" isLoading={isLoading} className="font-bold">
          <Save className="w-3.5 h-3.5 mr-1.5" />
          Save Poster
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Fields */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="p-5 border-zinc-800/80 bg-zinc-950/70 space-y-4">
            <Input
              label="Poster Name / Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Genesis Protocol Visualization"
              required
              className="text-base font-bold"
            />

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-300 block">Poster Image</label>
              <div className="flex gap-2">
                <Input
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="Paste image URL or upload"
                  required
                  className="flex-1 font-mono text-xs"
                />
                <label className="relative">
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
                  onClick={() => setShowAssetBrowser(true)}
                >
                  Library
                </Button>
              </div>
            </div>

            <Input
              label="External Redirect URL (Optional)"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              placeholder="https://..."
              className="font-mono text-xs"
            />
          </Card>
        </div>

        {/* Live Preview Card */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
            Live Card Preview
          </span>
          <Card className="p-0 overflow-hidden border-zinc-800/80 bg-zinc-950 shadow-2xl">
            {formData.imageUrl ? (
              <div className="aspect-[3/4] relative bg-zinc-950">
                <img
                  src={formData.imageUrl}
                  alt={formData.title || 'Preview'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-5">
                  <p className="text-white font-bold text-base truncate">{formData.title || 'Poster Title'}</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {formData.link ? 'Active Link Destination' : 'Visual Gallery Item'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="aspect-[3/4] flex flex-col items-center justify-center text-zinc-600 bg-zinc-900/30 p-6 text-center">
                <ImageIcon className="w-8 h-8 mb-2 stroke-[1.5]" />
                <p className="text-xs font-semibold text-zinc-400">No Image Selected</p>
                <p className="text-[10px] text-zinc-500 mt-1">Upload an image or select one from the asset library</p>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Media Modal */}
      <Dialog
        isOpen={showAssetBrowser}
        onClose={() => setShowAssetBrowser(false)}
        title="Poster Asset Library"
        size="xl"
      >
        <AssetBrowser onSelect={handleAssetSelect} category="posters" />
      </Dialog>
    </form>
  )
}
