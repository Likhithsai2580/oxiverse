'use client'

import React, { useState, useEffect, useMemo } from 'react'
import {
  Card,
  Button,
  Input,
  Badge,
  Dialog,
} from '@/components/admin/ui'
import { useToastContext } from '@/lib/providers/ToastProvider'
import {
  Search,
  Upload,
  Copy,
  Trash2,
  Image as ImageIcon,
  Check,
  ZoomIn,
  ZoomOut,
  ExternalLink,
  Download,
  X,
  Maximize2,
} from 'lucide-react'

interface Asset {
  id: string
  fileName: string
  url: string
  type: string
  size: number
  createdAt: string
}

interface AssetBrowserProps {
  onSelect?: (url: string) => void
  category?: string
  allowUpload?: boolean
}

const CATEGORIES = [
  { label: 'All Media', value: '' },
  { label: 'Blog', value: 'blog' },
  { label: 'Research', value: 'research' },
  { label: 'Ecosystem', value: 'ecosystem' },
  { label: 'Posters', value: 'posters' },
  { label: 'Pages', value: 'pages' },
  { label: 'Banners', value: 'banners' },
]

export default function AssetBrowser({ onSelect, category: defaultCategory, allowUpload = true }: AssetBrowserProps) {
  const [assets, setAssets] = useState<Asset[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory || '')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [previewAsset, setPreviewAsset] = useState<Asset | null>(null)
  const [zoomScale, setZoomScale] = useState(1)
  const { success, error } = useToastContext()

  useEffect(() => {
    fetchAssets()
  }, [selectedCategory])

  const fetchAssets = async () => {
    setIsLoading(true)
    try {
      const url = selectedCategory ? `/api/admin/assets?category=${selectedCategory}` : '/api/admin/assets'
      const res = await fetch(url)
      if (res.ok) {
        setAssets(await res.json())
      }
    } catch (err) {
      error('Failed to load assets')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 4.5 * 1024 * 1024) {
      error('Asset size exceeds 4.5MB limit.')
      e.target.value = ''
      return
    }

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      if (selectedCategory) formData.append('type', selectedCategory)

      const res = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        success('Asset uploaded successfully')
        fetchAssets()
      } else {
        error('Upload failed')
      }
    } catch (err) {
      error('An error occurred during upload')
    } finally {
      setIsUploading(false)
      e.target.value = ''
    }
  }

  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (!confirm('Are you sure you want to delete this media asset?')) return

    try {
      const res = await fetch(`/api/admin/assets?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        success('Asset deleted')
        setAssets((prev) => prev.filter((a) => a.id !== id))
        if (previewAsset?.id === id) {
          setPreviewAsset(null)
        }
      }
    } catch (err) {
      error('Failed to delete asset')
    }
  }

  const handleCopyUrl = (url: string, id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    success('Image URL copied to clipboard')
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleAssetClick = (asset: Asset) => {
    if (onSelect) {
      onSelect(asset.url)
    } else {
      setPreviewAsset(asset)
      setZoomScale(1)
    }
  }

  const filteredAssets = useMemo(() => {
    return assets.filter((a) => a.fileName.toLowerCase().includes(search.toLowerCase()))
  }, [assets, search])

  return (
    <div className="space-y-5">
      {/* Category filter pills & Search bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/80">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3 py-1 text-[11px] font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat.value
                  ? 'bg-zinc-800 text-white font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-56">
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search filename..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-950/80 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>

          {allowUpload && (
            <label className="relative flex-shrink-0">
              <input
                type="file"
                accept="image/png, image/jpeg, image/gif, image/webp, image/svg+xml"
                className="hidden"
                onChange={handleUpload}
                disabled={isUploading}
              />
              <Button
                type="button"
                variant="accent"
                size="sm"
                disabled={isUploading}
                isLoading={isUploading}
                onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()}
              >
                <Upload className="w-3.5 h-3.5 mr-1.5" />
                Upload Asset
              </Button>
            </label>
          )}
        </div>
      </div>

      {/* Asset Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div key={i} className="aspect-square rounded-xl bg-zinc-900/40 border border-zinc-800 animate-pulse" />
          ))}
        </div>
      ) : filteredAssets.length === 0 ? (
        <div className="py-20 text-center text-zinc-500 text-xs italic bg-zinc-950/40 rounded-xl border border-zinc-800/80">
          No media assets found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 max-h-[600px] overflow-y-auto pr-1">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              onClick={() => handleAssetClick(asset)}
              className="group relative aspect-square rounded-xl overflow-hidden bg-zinc-950/90 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-lg"
            >
              {/* Pattern Background for transparent/varied aspect ratios */}
              <div className="absolute inset-0 flex items-center justify-center p-2 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:8px_8px]">
                <img
                  src={asset.url}
                  alt={asset.fileName}
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end z-10">
                <p className="text-[11px] font-bold text-white truncate mb-1">{asset.fileName}</p>
                <div className="flex items-center justify-between pt-1 border-t border-white/10">
                  <span className="text-[9px] font-mono text-zinc-400 font-bold">
                    {(asset.size / 1024).toFixed(1)} KB
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setPreviewAsset(asset)
                        setZoomScale(1)
                      }}
                      className="p-1 rounded bg-zinc-800/80 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
                      title="Zoom Preview"
                    >
                      <Maximize2 className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleCopyUrl(asset.url, asset.id, e)}
                      className="p-1 rounded bg-zinc-800/80 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
                      title="Copy URL"
                    >
                      {copiedId === asset.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleDelete(asset.id, e)}
                      className="p-1 rounded bg-rose-500/20 text-rose-300 hover:bg-rose-500 hover:text-white transition-colors"
                      title="Delete Asset"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* High-Resolution Zoom / Detail Lightbox Modal */}
      {previewAsset && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setPreviewAsset(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header controls */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800">
              <div className="min-w-0 flex-1 pr-4">
                <h3 className="text-sm font-bold text-white truncate">{previewAsset.fileName}</h3>
                <div className="flex items-center gap-2 mt-0.5 text-[11px] text-zinc-400">
                  <span className="font-mono font-bold">{(previewAsset.size / 1024).toFixed(1)} KB</span>
                  <span>·</span>
                  <span>{new Date(previewAsset.createdAt).toLocaleDateString()}</span>
                  <span>·</span>
                  <Badge variant="outline" className="text-[10px] py-0 px-1.5">
                    {previewAsset.type}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setZoomScale((prev) => Math.max(0.5, prev - 0.25))}
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-xs font-mono text-zinc-400 font-bold px-1.5">
                  {Math.round(zoomScale * 100)}%
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setZoomScale((prev) => Math.min(3, prev + 0.25))}
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-8 text-xs font-bold ml-2"
                  onClick={() => handleCopyUrl(previewAsset.url, previewAsset.id)}
                >
                  <Copy className="w-3.5 h-3.5 mr-1.5" />
                  Copy URL
                </Button>
                {onSelect && (
                  <Button
                    variant="accent"
                    size="sm"
                    className="h-8 text-xs font-bold"
                    onClick={() => {
                      onSelect(previewAsset.url)
                      setPreviewAsset(null)
                    }}
                  >
                    Select Asset
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-zinc-400 hover:text-white ml-2"
                  onClick={() => setPreviewAsset(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Zoomable Image Container */}
            <div className="flex-1 overflow-auto flex items-center justify-center p-4 min-h-[350px] max-h-[60vh] bg-zinc-900/50 rounded-xl border border-zinc-800/60 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:12px_12px]">
              <img
                src={previewAsset.url}
                alt={previewAsset.fileName}
                style={{ transform: `scale(${zoomScale})`, transition: 'transform 0.15s ease-out' }}
                className="max-h-[55vh] max-w-full object-contain select-none shadow-2xl rounded-lg"
              />
            </div>

            {/* Footer with Actions */}
            <div className="pt-4 mt-4 border-t border-zinc-800 flex items-center justify-between">
              <a
                href={previewAsset.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-mono truncate max-w-md"
              >
                <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{previewAsset.url}</span>
              </a>

              <Button
                variant="destructive"
                size="sm"
                className="h-8 text-xs"
                onClick={() => handleDelete(previewAsset.id)}
              >
                <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                Delete Media
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
