'use client'

import React from 'react'
import AssetBrowser from '../components/AssetBrowser'
import { Card } from '@/components/admin/ui'
import { ImageIcon } from 'lucide-react'

export default function AdminAssetsPage() {
  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6 pb-20">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Media Assets & Storage
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Upload, manage, and reference media files, whitepaper figures, and promotional artwork.
        </p>
      </div>

      <Card className="p-6 border-zinc-800/80 bg-zinc-950/70 shadow-xl">
        <AssetBrowser />
      </Card>
    </div>
  )
}
