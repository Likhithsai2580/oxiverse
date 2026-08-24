'use client'

import React, { useState, useEffect, useCallback, memo } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Badge,
  Input,
} from '@/components/admin/ui'
import { useToastContext } from '@/lib/providers/ToastProvider'
import {
  Milestone,
  Plus,
  Save,
  Trash2,
  Lock,
  Unlock,
  Check,
  X,
  Sliders,
  Eye,
  EyeOff,
} from 'lucide-react'

interface RoadmapItem {
  text: string
  status: 'done' | 'pending'
}

interface RoadmapPhase {
  phase: string
  title: string
  status: 'current' | 'upcoming' | 'future'
  isLocked: boolean
  blurIntensity: number
  items: RoadmapItem[]
}

const PhaseItem = memo(
  ({
    item,
    phaseIndex,
    itemIndex,
    onUpdateText,
    onToggleStatus,
    onRemove,
  }: {
    item: RoadmapItem
    phaseIndex: number
    itemIndex: number
    onUpdateText: (pIdx: number, iIdx: number, text: string) => void
    onToggleStatus: (pIdx: number, iIdx: number) => void
    onRemove: (pIdx: number, iIdx: number) => void
  }) => (
    <div className="flex items-center gap-3 bg-zinc-900/60 hover:bg-zinc-900 p-2.5 rounded-lg border border-zinc-800/80 transition-all group">
      <button
        type="button"
        onClick={() => onToggleStatus(phaseIndex, itemIndex)}
        className={`w-5 h-5 rounded-md flex items-center justify-center transition-all cursor-pointer ${
          item.status === 'done'
            ? 'bg-emerald-500 text-white font-bold'
            : 'border border-zinc-700 hover:border-zinc-500 text-transparent'
        }`}
      >
        <Check className="w-3.5 h-3.5 stroke-[3]" />
      </button>

      <input
        type="text"
        value={item.text}
        onChange={(e) => onUpdateText(phaseIndex, itemIndex, e.target.value)}
        className={`flex-1 bg-transparent text-xs font-medium focus:outline-none ${
          item.status === 'done' ? 'text-zinc-500 line-through' : 'text-zinc-200'
        }`}
        placeholder="Milestone specification..."
      />

      <button
        type="button"
        onClick={() => onRemove(phaseIndex, itemIndex)}
        className="p-1 text-zinc-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        title="Remove milestone"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  )
)
PhaseItem.displayName = 'PhaseItem'

const PhaseCard = memo(
  ({
    phase,
    index,
    onUpdate,
    onRemove,
    onAddItem,
    onRemoveItem,
    onUpdateItemText,
    onToggleItemStatus,
  }: {
    phase: RoadmapPhase
    index: number
    onUpdate: (idx: number, field: keyof RoadmapPhase, value: any) => void
    onRemove: (idx: number) => void
    onAddItem: (idx: number) => void
    onRemoveItem: (pIdx: number, iIdx: number) => void
    onUpdateItemText: (pIdx: number, iIdx: number, text: string) => void
    onToggleItemStatus: (pIdx: number, iIdx: number) => void
  }) => (
    <Card className="p-6 border-zinc-800/80 bg-zinc-950/70 relative group">
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center font-mono font-black text-xs">
            {index + 1}
          </div>
          <div>
            <input
              type="text"
              value={phase.phase}
              onChange={(e) => onUpdate(index, 'phase', e.target.value)}
              className="bg-transparent font-bold text-xs text-sky-400 uppercase tracking-wider focus:outline-none"
            />
            <div className="flex items-center gap-2 mt-0.5">
              <select
                value={phase.status}
                onChange={(e) => onUpdate(index, 'status', e.target.value)}
                className="bg-zinc-900 border border-zinc-800 text-[11px] font-semibold text-zinc-300 rounded px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer"
              >
                <option value="current">Active Phase</option>
                <option value="upcoming">Upcoming Phase</option>
                <option value="future">Future Vision</option>
              </select>

              {phase.isLocked && (
                <Badge variant="destructive" dot className="text-[10px] py-0 px-1.5">
                  Locked
                </Badge>
              )}
              {phase.blurIntensity > 0 && (
                <Badge variant="warning" className="text-[10px] py-0 px-1.5">
                  Blur {phase.blurIntensity}px
                </Badge>
              )}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onRemove(index)}
          className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
          title="Delete Phase"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Phase Main Goal & Items (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <Input
            label="Phase Strategic Objective"
            value={phase.title}
            onChange={(e) => onUpdate(index, 'title', e.target.value)}
            placeholder="e.g. Distributed Consensus Layer & Intent Verification"
            className="text-sm font-bold"
          />

          <div className="space-y-2 pt-2">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
              Phase Milestones ({phase.items.filter((i) => i.status === 'done').length}/{phase.items.length})
            </span>

            <div
              className="space-y-2 transition-all relative"
              style={{
                filter: phase.blurIntensity > 0 ? `blur(${phase.blurIntensity}px)` : 'none',
              }}
            >
              {phase.items.map((item, iIdx) => (
                <PhaseItem
                  key={iIdx}
                  item={item}
                  phaseIndex={index}
                  itemIndex={iIdx}
                  onUpdateText={onUpdateItemText}
                  onToggleStatus={onToggleItemStatus}
                  onRemove={onRemoveItem}
                />
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onAddItem(index)}
              className="mt-2 text-xs"
            >
              <Plus className="w-3 h-3 mr-1.5" />
              Add Milestone
            </Button>
          </div>
        </div>

        {/* Phase Privacy & Blur Controls (4 cols) */}
        <div className="lg:col-span-4 bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/60 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-zinc-500" />
              Security & Display
            </h4>

            {/* Interactive Lock Switch */}
            <div
              onClick={() => onUpdate(index, 'isLocked', !phase.isLocked)}
              className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                phase.isLocked
                  ? 'bg-rose-500/10 border-rose-500/30'
                  : 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {phase.isLocked ? (
                  <Lock className="w-4 h-4 text-rose-400" />
                ) : (
                  <Unlock className="w-4 h-4 text-zinc-400" />
                )}
                <div>
                  <span className={`text-xs font-bold block ${phase.isLocked ? 'text-rose-300' : 'text-zinc-200'}`}>
                    {phase.isLocked ? 'Content Locked' : 'Content Public'}
                  </span>
                  <span className="text-[10px] text-zinc-500">
                    {phase.isLocked ? 'Shows Access Denied overlay' : 'Visible to visitors'}
                  </span>
                </div>
              </div>

              <div
                className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                  phase.isLocked ? 'bg-rose-500' : 'bg-zinc-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    phase.isLocked ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </div>
            </div>

            {/* Blur Intensity Slider */}
            <div className="space-y-2 p-3 bg-zinc-900/60 rounded-lg border border-zinc-800/60">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-medium">Blur Obfuscation</span>
                <span className="font-mono text-sky-400 font-bold">{phase.blurIntensity}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={phase.blurIntensity}
                onChange={(e) => onUpdate(index, 'blurIntensity', parseInt(e.target.value) || 0)}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
              <p className="text-[10px] text-zinc-500">
                {phase.blurIntensity === 0 ? 'No blur applied' : `Applies ${phase.blurIntensity}px gaussian blur to items`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
)
PhaseCard.displayName = 'PhaseCard'

export default function AdminRoadmapPage() {
  const [phases, setPhases] = useState<RoadmapPhase[]>([])
  const [saving, setSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { success, error } = useToastContext()

  useEffect(() => {
    fetchRoadmap()
  }, [])

  const fetchRoadmap = async () => {
    try {
      const res = await fetch('/api/roadmap')
      const data = await res.json()
      setPhases(data || [])
    } catch (err) {
      error('Failed to load roadmap')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(phases),
      })
      if (res.ok) {
        success('Roadmap saved successfully')
      } else {
        throw new Error()
      }
    } catch (err) {
      error('Failed to save roadmap')
    } finally {
      setSaving(false)
    }
  }

  const addPhase = useCallback(() => {
    setPhases((prev) => [
      ...prev,
      {
        phase: `Phase ${prev.length + 1}`,
        title: 'New Strategic Phase',
        status: 'future',
        isLocked: false,
        blurIntensity: 0,
        items: [{ text: 'Key milestone specification', status: 'pending' }],
      },
    ])
  }, [])

  const removePhase = useCallback((index: number) => {
    if (confirm('Are you sure you want to delete this phase?')) {
      setPhases((prev) => {
        const filtered = prev.filter((_, i) => i !== index)
        return filtered.map((p, i) => ({ ...p, phase: `Phase ${i + 1}` }))
      })
    }
  }, [])

  const updatePhase = useCallback((index: number, field: keyof RoadmapPhase, value: any) => {
    setPhases((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }, [])

  const updateItemText = useCallback((phaseIndex: number, itemIndex: number, text: string) => {
    setPhases((prev) => {
      const updated = [...prev]
      const items = [...updated[phaseIndex].items]
      items[itemIndex] = { ...items[itemIndex], text }
      updated[phaseIndex] = { ...updated[phaseIndex], items }
      return updated
    })
  }, [])

  const toggleItemStatus = useCallback((phaseIndex: number, itemIndex: number) => {
    setPhases((prev) => {
      const updated = [...prev]
      const items = [...updated[phaseIndex].items]
      items[itemIndex] = {
        ...items[itemIndex],
        status: items[itemIndex].status === 'done' ? 'pending' : 'done',
      }
      updated[phaseIndex] = { ...updated[phaseIndex], items }
      return updated
    })
  }, [])

  const addItem = useCallback((phaseIndex: number) => {
    setPhases((prev) => {
      const updated = [...prev]
      const items = [...updated[phaseIndex].items, { text: '', status: 'pending' }]
      updated[phaseIndex] = { ...updated[phaseIndex], items }
      return updated
    })
  }, [])

  const removeItem = useCallback((phaseIndex: number, itemIndex: number) => {
    setPhases((prev) => {
      const updated = [...prev]
      const items = [...updated[phaseIndex].items]
      items.splice(itemIndex, 1)
      updated[phaseIndex] = { ...updated[phaseIndex], items }
      return updated
    })
  }, [])

  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-6 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Ecosystem Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Architect milestones, active development phases, and strategic timelines.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button variant="outline" size="sm" onClick={addPhase}>
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Append Phase
          </Button>

          <Button
            variant="accent"
            size="sm"
            onClick={handleSave}
            disabled={saving}
            isLoading={saving}
            className="font-bold"
          >
            <Save className="w-3.5 h-3.5 mr-1.5" />
            Commit Roadmap
          </Button>
        </div>
      </div>

      {/* Phase Cards */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-64 rounded-xl bg-zinc-900/40 border border-zinc-800 animate-pulse" />
          ))}
        </div>
      ) : phases.length === 0 ? (
        <Card className="text-center py-16 border-zinc-800/80 bg-zinc-950/40">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4 text-zinc-500 shadow-inner">
            <Milestone className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">No roadmap phases defined</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-6">
            Begin architecting the strategic phases for the Oxiverse ecosystem.
          </p>
          <Button variant="outline" size="sm" onClick={addPhase}>
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Create First Phase
          </Button>
        </Card>
      ) : (
        <div className="space-y-6">
          {phases.map((phase, pIdx) => (
            <PhaseCard
              key={pIdx}
              phase={phase}
              index={pIdx}
              onUpdate={updatePhase}
              onRemove={removePhase}
              onAddItem={addItem}
              onRemoveItem={removeItem}
              onUpdateItemText={updateItemText}
              onToggleItemStatus={toggleItemStatus}
            />
          ))}

          <button
            type="button"
            onClick={addPhase}
            className="w-full py-6 border border-dashed border-zinc-800 hover:border-zinc-700 rounded-xl bg-zinc-900/20 hover:bg-zinc-900/40 text-zinc-400 hover:text-white transition-all flex items-center justify-center gap-2 text-xs font-bold cursor-pointer"
          >
            <Plus className="w-4 h-4 text-sky-400" />
            Append New Roadmap Phase
          </button>
        </div>
      )}
    </div>
  )
}
