'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Sparkles,
  Search,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  X,
  Calendar,
  Maximize2,
} from 'lucide-react'

interface Poster {
  id: string
  title: string
  slug: string
  imageUrl: string
  link: string | null
  createdAt: string
}

export default function GalleryClient({ initialPosters }: { initialPosters: Poster[] }) {
  const [posters] = useState<Poster[]>(initialPosters)
  const [search, setSearch] = useState('')
  const [selectedPoster, setSelectedPoster] = useState<Poster | null>(null)
  const [zoomScale, setZoomScale] = useState(1)

  const filteredPosters = useMemo(() => {
    return posters.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    )
  }, [posters, search])

  const openLightbox = (poster: Poster) => {
    setSelectedPoster(poster)
    setZoomScale(1)
  }

  const closeLightbox = () => {
    setSelectedPoster(null)
    setZoomScale(1)
  }

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 md:px-8">
      {/* Header Banner */}
      <div className="mb-12 text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 border-2 border-accent-300 px-3.5 py-1 bg-primary-900 shadow-retro-sm">
          <Sparkles className="w-3.5 h-3.5 text-accent-300" />
          <span className="font-mono text-xs uppercase tracking-widest font-bold text-accent-300">
            Aesthetic Archive
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-primary-50">
          Visual <span className="text-accent-300">Gallery</span>
        </h1>

        <p className="text-primary-300 text-sm sm:text-base leading-relaxed">
          High-resolution visual posters, architecture diagrams, and concept artifacts crafted across the Oxiverse ecosystem.
        </p>

        {/* Search Bar */}
        <div className="pt-4 max-w-md mx-auto relative">
          <Search className="absolute left-3.5 top-6.5 w-4 h-4 text-primary-400" />
          <input
            type="text"
            placeholder="Search artifacts by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-primary-900 border-2 border-primary-700 focus:border-accent-300 rounded-none pl-10 pr-4 py-2.5 text-xs sm:text-sm text-primary-50 placeholder:text-primary-400 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Gallery Grid */}
      {filteredPosters.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-primary-800 bg-primary-900/40 p-8">
          <p className="text-primary-400 font-mono text-sm uppercase tracking-wider">
            {search ? 'No visual artifacts match your query.' : 'No gallery posters published yet.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPosters.map((poster) => (
            <div
              key={poster.id}
              onClick={() => openLightbox(poster)}
              className="retro-box p-0 overflow-hidden group cursor-pointer hover:border-accent-300 transition-all duration-300 flex flex-col justify-between bg-primary-900"
            >
              <div className="relative aspect-[3/4] bg-primary-950 overflow-hidden">
                <img
                  src={poster.imageUrl}
                  alt={poster.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <div className="flex items-center justify-between text-accent-300 text-xs font-mono uppercase tracking-wider mb-1">
                    <span className="flex items-center gap-1">
                      <Maximize2 className="w-3.5 h-3.5" /> Click to Zoom
                    </span>
                  </div>
                </div>

                <div className="absolute top-2 right-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-primary-950/80 border border-primary-700 text-primary-300 uppercase">
                    {new Date(poster.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-primary-800 border-t-2 border-primary-700 flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-primary-50 truncate">{poster.title}</h3>
                {poster.link && (
                  <a
                    href={poster.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 text-primary-400 hover:text-accent-300 transition-colors"
                    title="External resource"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox / Zoom Modal */}
      {selectedPoster && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-5xl w-full bg-primary-900 border-2 border-accent-300 p-4 sm:p-6 shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header controls */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-primary-700">
              <div>
                <h2 className="text-base sm:text-lg font-display font-bold uppercase text-primary-50">
                  {selectedPoster.title}
                </h2>
                <p className="text-[11px] font-mono text-primary-400">
                  Published {new Date(selectedPoster.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setZoomScale((prev) => Math.max(0.6, prev - 0.2))}
                  className="p-1.5 rounded bg-primary-800 text-primary-300 hover:text-white border border-primary-700 transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomScale(1)}
                  className="px-2 py-1 text-[11px] font-mono rounded bg-primary-800 text-primary-300 hover:text-white border border-primary-700"
                >
                  {Math.round(zoomScale * 100)}%
                </button>
                <button
                  type="button"
                  onClick={() => setZoomScale((prev) => Math.min(2.5, prev + 0.2))}
                  className="p-1.5 rounded bg-primary-800 text-primary-300 hover:text-white border border-primary-700 transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                {selectedPoster.link && (
                  <a
                    href={selectedPoster.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded bg-accent-300 text-primary-950 font-bold hover:bg-accent-200 transition-colors ml-2 flex items-center gap-1 text-xs"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="p-1.5 rounded bg-primary-800 text-primary-400 hover:text-white border border-primary-700 ml-2"
                  title="Close Preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Zoomable Image Container */}
            <div className="flex-1 overflow-auto flex items-center justify-center p-2 min-h-[300px] max-h-[70vh] bg-primary-950 border border-primary-800">
              <img
                src={selectedPoster.imageUrl}
                alt={selectedPoster.title}
                style={{ transform: `scale(${zoomScale})`, transition: 'transform 0.15s ease-out' }}
                className="max-h-[65vh] w-auto object-contain select-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
