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
  Calendar,
  Link as LinkIcon,
  Image as ImageIcon,
} from 'lucide-react'
import Link from 'next/link'

interface Banner {
  id: string
  title: string
  imageUrl: string | null
  message: string | null
  link: string | null
  linkText: string | null
  placement: string
  active: boolean
  order: number
  startAt: string | null
  endAt: string | null
}

const PLACEMENT_OPTIONS = [
  { value: 'announcement', label: 'Announcement Bar', description: 'Top of every page — text notification or alert banner' },
  { value: 'hero', label: 'Hero Banner', description: 'Prominent header banner in hero/introduction sections' },
  { value: 'section', label: 'Section Banner', description: 'Promotional inline strip inside content sections' },
]

export default function AdminBannerEditor() {
  const router = useRouter()
  const params = useParams()
  const { success, error } = useToastContext()
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [showAssetBrowser, setShowAssetBrowser] = useState(false)

  const isEdit = params.id !== 'new'

  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    message: '',
    link: '',
    linkText: '',
    placement: 'announcement',
    active: true,
    order: 0,
    startAt: '',
    endAt: '',
  })

  useEffect(() => {
    if (isEdit) {
      fetchBanner()
    }
  }, [isEdit])

  const fetchBanner = async () => {
    setIsFetching(true)
    try {
      const res = await fetch(`/api/admin/banners/${params.id}`)
      if (res.ok) {
        const banner: Banner = await res.json()
        setFormData({
          title: banner.title || '',
          imageUrl: banner.imageUrl || '',
          message: banner.message || '',
          link: banner.link || '',
          linkText: banner.linkText || '',
          placement: banner.placement || 'announcement',
          active: banner.active,
          order: banner.order || 0,
          startAt: banner.startAt ? banner.startAt.slice(0, 16) : '',
          endAt: banner.endAt ? banner.endAt.slice(0, 16) : '',
        })
      } else {
        error('Failed to load banner')
        router.push('/admin/banners')
      }
    } catch (err) {
      error('Failed to load banner')
      router.push('/admin/banners')
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
      uploadFormData.append('type', 'banners')

      const res = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: uploadFormData,
      })

      if (res.ok) {
        const data = await res.json()
        setFormData((prev) => ({ ...prev, imageUrl: data.url }))
        success('Banner image uploaded!')
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
      error('Title is required')
      return
    }

    setIsLoading(true)
    try {
      const url = isEdit ? `/api/admin/banners/${params.id}` : '/api/admin/banners'
      const method = isEdit ? 'PUT' : 'POST'

      const payload: any = {
        title: formData.title,
        placement: formData.placement,
        active: formData.active,
        order: formData.order,
        link: formData.link || null,
        linkText: formData.linkText || null,
        startAt: formData.startAt ? new Date(formData.startAt).toISOString() : null,
        endAt: formData.endAt ? new Date(formData.endAt).toISOString() : null,
      }
      if (formData.imageUrl) payload.imageUrl = formData.imageUrl
      if (formData.message) payload.message = formData.message

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        success(isEdit ? 'Banner updated' : 'Banner created')
        router.push('/admin/banners')
      } else {
        const data = await res.json()
        error(data.error || 'Failed to save banner')
      }
    } catch (err) {
      error('Failed to save banner')
    } finally {
      setIsLoading(false)
    }
  }

  if (isFetching) {
    return (
      <div className="p-12 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3 text-zinc-400">
          <div className="w-8 h-8 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
          <p className="text-xs">Loading banner configuration...</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-8 max-w-4xl mx-auto space-y-6 pb-24">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
        <div className="flex items-center gap-3">
          <Link href="/admin/banners">
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {isEdit ? 'Edit Banner' : 'New Banner Campaign'}
            </h1>
            <p className="text-xs text-zinc-400">Configure messaging, graphics, and targeting</p>
          </div>
        </div>

        <Button type="submit" variant="accent" size="sm" isLoading={isLoading} className="font-bold">
          <Save className="w-3.5 h-3.5 mr-1.5" />
          Save Banner
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Main Banner Details */}
        <Card className="p-5 border-zinc-800/80 bg-zinc-950/70 space-y-4 md:col-span-2">
          <Input
            label="Banner Title / Internal Identifier"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Q3 Mainnet Release Announcement"
            required
            className="text-base font-bold"
          />

          <Textarea
            label="Display Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Announcing our latest consensus breakthrough. Read the whitepaper..."
            rows={3}
            className="text-xs"
          />
        </Card>

        {/* Placement Selector */}
        <Card className="p-5 border-zinc-800/80 bg-zinc-950/70 space-y-4">
          <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider border-b border-zinc-800/80 pb-2">
            Placement Location
          </h3>

          <div className="space-y-2.5">
            {PLACEMENT_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  formData.placement === opt.value
                    ? 'border-sky-500/50 bg-sky-500/10'
                    : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
                }`}
              >
                <input
                  type="radio"
                  name="placement"
                  value={opt.value}
                  checked={formData.placement === opt.value}
                  onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
                  className="mt-0.5 w-4 h-4 text-sky-500 focus:ring-sky-500"
                />
                <div>
                  <span className="block text-xs font-bold text-white">{opt.label}</span>
                  <span className="block text-[11px] text-zinc-400 mt-0.5">{opt.description}</span>
                </div>
              </label>
            ))}
          </div>

          <div className="flex items-center justify-between p-3 bg-zinc-900/50 rounded-lg border border-zinc-800/80 mt-4">
            <div>
              <p className="text-xs font-bold text-white">Active Status</p>
              <p className="text-[10px] text-zinc-400">Broadcast immediately to site visitors</p>
            </div>
            <input
              type="checkbox"
              id="banner-active"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-sky-500 focus:ring-sky-500 cursor-pointer"
            />
          </div>
        </Card>

        {/* Schedule & Timing */}
        <Card className="p-5 border-zinc-800/80 bg-zinc-950/70 space-y-4">
          <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider border-b border-zinc-800/80 pb-2">
            Schedule & Sorting
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-zinc-300 mb-1 block">Start Date / Time</label>
              <input
                type="datetime-local"
                value={formData.startAt}
                onChange={(e) => setFormData({ ...formData, startAt: e.target.value })}
                className="w-full bg-zinc-900/80 border border-zinc-800 text-zinc-100 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 mb-1 block">End Date / Time</label>
              <input
                type="datetime-local"
                value={formData.endAt}
                onChange={(e) => setFormData({ ...formData, endAt: e.target.value })}
                className="w-full bg-zinc-900/80 border border-zinc-800 text-zinc-100 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 mb-1 block">Display Priority (Order)</label>
              <Input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="text-xs"
              />
            </div>
          </div>
        </Card>

        {/* Banner Graphic & Action Link */}
        <Card className="p-5 border-zinc-800/80 bg-zinc-950/70 space-y-4 md:col-span-2">
          <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider border-b border-zinc-800/80 pb-2">
            Media & Call-to-Action Link
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-xs font-semibold text-zinc-300 block">Banner Visual Image</label>
              {formData.imageUrl ? (
                <div className="relative aspect-video rounded-lg overflow-hidden border border-zinc-800 group">
                  <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Banner preview" />
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
                    onClick={() => setShowAssetBrowser(true)}
                  >
                    Media Library
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Input
                label="Destination URL (Optional)"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="https://oxiverse.com/..."
                className="text-xs font-mono"
              />
              <Input
                label="Action Button Label"
                value={formData.linkText}
                onChange={(e) => setFormData({ ...formData, linkText: e.target.value })}
                placeholder="Learn More, Read Post, Get Started"
                className="text-xs"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Media Modal */}
      <Dialog
        isOpen={showAssetBrowser}
        onClose={() => setShowAssetBrowser(false)}
        title="Banner Media Library"
        size="xl"
      >
        <AssetBrowser onSelect={handleAssetSelect} category="banners" />
      </Dialog>
    </form>
  )
}