'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Card, Button, Input, Spinner } from '@/components/ui'
import { useToastContext } from '@/lib/providers/ToastProvider'

export default function AdminPosterEditPage() {
  const router = useRouter()
  const params = useParams()
  const { success, error } = useToastContext()
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
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
          title: data.title,
          imageUrl: data.imageUrl,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="p-8 pb-20 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {isEdit ? 'Refine Visual' : 'New Aesthetic Artifact'}
          </h1>
          <p className="text-dark-400">Manage visual posters and external links</p>
        </div>
        <Button
          variant="ghost"
          onClick={() => router.push('/admin/posters')}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <Card className="bg-dark-900/40 border-white/5 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Artifact Name"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Poster Title"
                required
                disabled={isLoading}
                className="bg-dark-950/50 border-white/5 focus:border-primary-500/30 font-bold"
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-300">Visual Asset</label>
                <div className="flex gap-4">
                  <Input
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="URL or Upload"
                    required
                    disabled={isLoading}
                    className="flex-1 bg-dark-950/50 border-white/5 focus:border-primary-500/30"
                  />
                  <div className="relative group">
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/gif, image/webp"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      disabled={isUploading || isLoading}
                    />
                    <Button variant="outline" className="glass" disabled={isUploading || isLoading}>
                      {isUploading ? <Spinner size="sm" /> : 'Upload'}
                    </Button>
                  </div>
                </div>
                <p className="text-[10px] text-dark-500 uppercase tracking-widest">Supports PNG, JPG, WEBP • Max 5MB</p>
              </div>

              <Input
                label="Redirect Link (Optional)"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="https://example.com/details"
                disabled={isLoading}
                className="bg-dark-950/50 border-white/5 focus:border-primary-500/30"
              />

              <Button type="submit" variant="primary" className="w-full shadow-lg shadow-primary-500/20" disabled={isLoading}>
                {isLoading ? <Spinner size="sm" /> : isEdit ? 'Commit Changes' : 'Initialize Artifact'}
              </Button>
            </form>
          </Card>
        </div>

        <div className="space-y-4">
           <h3 className="text-sm font-black uppercase tracking-widest text-dark-500">Live Preview</h3>
          {formData.imageUrl ? (
            <Card className="p-0 overflow-hidden bg-dark-900 border-white/10 shadow-2xl relative group">
              <div className="aspect-[3/4] relative">
                <img
                  src={formData.imageUrl}
                  alt={formData.title || 'Preview'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-transparent to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-white font-bold text-2xl truncate">{formData.title || 'Artifact Title'}</h4>
                  <p className="text-dark-400 text-sm mt-1">{formData.link ? 'Active Navigation' : 'Visual Only'}</p>
                </div>
              </div>
            </Card>
          ) : (
            <div className="aspect-[3/4] bg-dark-900/40 rounded-2xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-dark-500 space-y-4">
              <div className="w-16 h-16 bg-dark-800 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-xs font-medium uppercase tracking-widest">Awaiting Visual Input</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
