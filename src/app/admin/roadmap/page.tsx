'use client'

import { useState, useEffect } from 'react'
import { Button, Card } from '@/components/ui'
import { toast } from 'react-hot-toast'

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

export default function AdminRoadmapPage() {
  const [phases, setPhases] = useState<RoadmapPhase[]>([])
  const [saving, setSaving] = useState(false)

  // Proper loading state handling
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchRoadmap()
  }, [])

  const fetchRoadmap = async () => {
    try {
      const res = await fetch('/api/roadmap')
      const data = await res.json()
      setPhases(data)
    } catch (error) {
      toast.error('Failed to load roadmap')
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
        body: JSON.stringify(phases)
      })
      if (res.ok) {
        toast.success('Roadmap updated successfully')
      } else {
        throw new Error()
      }
    } catch (error) {
      toast.error('Failed to save roadmap')
    } finally {
      setSaving(false)
    }
  }

  const addPhase = () => {
    const newPhase: RoadmapPhase = {
      phase: `Phase ${phases.length + 1}`,
      title: 'New Phase',
      status: 'future',
      isLocked: false,
      blurIntensity: 0,
      items: [{ text: 'New Milestone', status: 'pending' }]
    }
    setPhases([...phases, newPhase])
  }

  const removePhase = (index: number) => {
    if (confirm('Are you sure you want to delete this entire phase?')) {
      const newPhases = phases.filter((_, i) => i !== index)
      // Re-index phase names
      const reindexed = newPhases.map((p, i) => ({ ...p, phase: `Phase ${i + 1}` }))
      setPhases(reindexed)
    }
  }

  const updatePhase = (index: number, field: keyof RoadmapPhase, value: any) => {
    const newPhases = [...phases]
    newPhases[index] = { ...newPhases[index], [field]: value }
    setPhases(newPhases)
  }

  const updateItemText = (phaseIndex: number, itemIndex: number, text: string) => {
    const newPhases = [...phases]
    newPhases[phaseIndex].items[itemIndex].text = text
    setPhases(newPhases)
  }

  const toggleItemStatus = (phaseIndex: number, itemIndex: number) => {
    const newPhases = [...phases]
    newPhases[phaseIndex].items[itemIndex].status = 
      newPhases[phaseIndex].items[itemIndex].status === 'done' ? 'pending' : 'done'
    setPhases(newPhases)
  }

  const addItem = (phaseIndex: number) => {
    const newPhases = [...phases]
    newPhases[phaseIndex].items.push({ text: '', status: 'pending' })
    setPhases(newPhases)
  }

  const removeItem = (phaseIndex: number, itemIndex: number) => {
    const newPhases = [...phases]
    newPhases[phaseIndex].items.splice(itemIndex, 1)
    setPhases(newPhases)
  }

  if (isLoading) return (
    <div className="p-8 flex items-center justify-center min-h-[400px]">
      <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  return (
    <div className="p-8 pb-32 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-5xl font-black text-white mb-3 font-display tracking-tight">Roadmap Manager</h1>
          <p className="text-dark-400 text-lg">Architect the evolution of the Oxiverse ecosystem.</p>
        </div>
        <div className="flex gap-4">
          <Button 
            onClick={addPhase} 
            variant="outline"
            className="glass border-white/10"
          >
            Add New Phase
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={saving}
            variant="primary"
            className="shadow-[0_0_30px_rgba(14,165,233,0.4)]"
          >
            {saving ? 'Saving System...' : 'Commit Changes'}
          </Button>
        </div>
      </div>

      <div className="space-y-10">
        {phases.map((phase, pIdx) => (
          <Card key={pIdx} variant="glass" className="border-white/5 bg-dark-900/60 p-8 relative group">
            <div className="absolute top-6 right-6 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all">
               <button
                onClick={() => removePhase(pIdx)}
                className="p-2 text-dark-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                title="Delete Phase"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Sidebar Config */}
              <div className="lg:col-span-4 space-y-6 border-r border-white/5 pr-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-400 font-black text-xl border border-primary-500/20 shadow-inner">
                    {pIdx + 1}
                  </div>
                  <div>
                    <input
                      value={phase.phase}
                      onChange={(e) => updatePhase(pIdx, 'phase', e.target.value)}
                      className="bg-transparent text-[10px] font-black text-primary-500 uppercase tracking-widest focus:outline-none w-full"
                    />
                    <select 
                      value={phase.status}
                      onChange={(e) => updatePhase(pIdx, 'status', e.target.value)}
                      className="bg-transparent text-xs font-bold text-dark-400 focus:outline-none cursor-pointer hover:text-white transition-colors"
                    >
                      <option value="current">Active Phase</option>
                      <option value="upcoming">Next Up</option>
                      <option value="future">Future Vision</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-dark-300">Lock Phase Content</label>
                    <button
                      onClick={() => updatePhase(pIdx, 'isLocked', !phase.isLocked)}
                      className={`w-10 h-5 rounded-full transition-all relative ${phase.isLocked ? 'bg-primary-500' : 'bg-dark-700'}`}
                    >
                      <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${phase.isLocked ? 'left-6' : 'left-1'}`} />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-dark-300">Blur Intensity</label>
                      <span className="text-[10px] font-mono text-primary-400 bg-primary-500/10 px-1.5 rounded">{phase.blurIntensity}px</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      step="1"
                      value={phase.blurIntensity}
                      onChange={(e) => updatePhase(pIdx, 'blurIntensity', parseInt(e.target.value))}
                      className="w-full h-1.5 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                    />
                  </div>
                </div>
              </div>

              {/* Main Editor */}
              <div className="lg:col-span-8 space-y-6">
                <input
                  value={phase.title}
                  onChange={(e) => updatePhase(pIdx, 'title', e.target.value)}
                  className="w-full bg-transparent text-2xl font-black text-white border-b border-white/5 hover:border-white/20 focus:border-primary-500 focus:outline-none transition-all pb-2"
                  placeholder="Phase Strategic Goal"
                />

                <div className="space-y-2">
                  {phase.items.map((item, iIdx) => (
                    <div key={iIdx} className="flex items-center gap-3 group/item bg-white/[0.02] hover:bg-white/[0.04] p-2 rounded-xl transition-all border border-transparent hover:border-white/5">
                      <button
                        onClick={() => toggleItemStatus(pIdx, iIdx)}
                        className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                          item.status === 'done' 
                            ? 'bg-primary-500 border-primary-500 text-white' 
                            : 'border-white/10 hover:border-white/30 text-transparent'
                        }`}
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      <input
                        value={item.text}
                        onChange={(e) => updateItemText(pIdx, iIdx, e.target.value)}
                        className={`flex-1 bg-transparent text-sm font-medium focus:outline-none ${
                          item.status === 'done' ? 'text-dark-500 line-through' : 'text-white'
                        }`}
                        placeholder="Define a milestone..."
                      />
                      <button
                        onClick={() => removeItem(pIdx, iIdx)}
                        className="p-1 text-dark-700 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addItem(pIdx)}
                    className="flex items-center gap-2 text-[10px] font-black text-primary-500 hover:text-primary-400 transition-all mt-4 uppercase tracking-widest bg-primary-500/5 px-4 py-2 rounded-lg hover:bg-primary-500/10 w-fit"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                    </svg>
                    New Milestone
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}

        <button
          onClick={addPhase}
          className="w-full py-8 border-2 border-dashed border-white/10 rounded-3xl text-dark-500 hover:text-primary-400 hover:border-primary-500/50 hover:bg-primary-500/5 transition-all flex flex-col items-center gap-3 group"
        >
          <div className="w-12 h-12 rounded-full bg-dark-800 flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="font-display font-bold text-lg">Append Next Phase</span>
        </button>
      </div>
    </div>
  )
}
