'use client'

import React, { useState, useRef, useEffect } from 'react'
import Section from '@/components/ui/Section'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, ShieldAlert } from 'lucide-react'

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

export default function Roadmap() {
  const [phases, setPhases] = useState<RoadmapPhase[]>([])
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/roadmap')
      .then((res) => res.json())
      .then((data) => {
        setPhases(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch roadmap:', err)
        setLoading(false)
      })
  }, [])

  const containerRef = useRef<HTMLDivElement>(null)

  const togglePhase = (index: number) => {
    setExpandedPhase(expandedPhase === index ? null : index)
  }

  return (
    <Section id="roadmap" className="pt-32 pb-24 bg-primary-900 relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
        <div className="inline-block border-2 border-primary-50 px-3 py-1 mb-6 bg-primary-950">
          <span className="font-mono text-xs uppercase tracking-widest font-bold text-accent-300">
            Roadmap
          </span>
        </div>
        <h2 className="font-display text-[3rem] md:text-[4.5rem] leading-[0.9] text-primary-50 tracking-tighter font-bold uppercase">
          Building the <span className="text-accent-300">Future.</span>
        </h2>
        <p className="mt-6 text-primary-300 text-lg max-w-xl">
          Our journey to create a complete privacy-first ecosystem.
        </p>
      </div>

      <div ref={containerRef} className="space-y-6 max-w-4xl mx-auto px-4 md:px-8 relative">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-accent-300 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 font-mono text-xs text-primary-400 uppercase tracking-widest">
              Loading Roadmap Data...
            </p>
          </div>
        ) : (
          phases.map((phaseData, index) => {
            const isExpanded = expandedPhase === index
            const isPhaseLocked = Boolean(phaseData.isLocked)
            const blurVal = phaseData.blurIntensity ?? 0

            return (
              <div key={phaseData.phase || index} className="retro-box p-0 overflow-hidden">
                {/* Header Toggle Bar */}
                <button
                  type="button"
                  onClick={() => togglePhase(index)}
                  className="w-full text-left p-0 cursor-pointer block"
                >
                  <div
                    className={`retro-header-bar ${
                      phaseData.status === 'current'
                        ? '!bg-accent-300 !text-primary-950'
                        : isPhaseLocked
                        ? '!bg-rose-950 !text-rose-200 border-b !border-rose-700'
                        : ''
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isPhaseLocked && (
                        <span className="flex items-center gap-1 text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded border border-rose-500/40">
                          <Lock className="w-3 h-3" /> LOCKED
                        </span>
                      )}
                      <span className="font-bold tracking-wider">
                        {phaseData.phase.toUpperCase()}: {phaseData.title.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px]">
                        {phaseData.items?.filter((i) => i.status === 'done').length || 0}/
                        {phaseData.items?.length || 0}
                      </span>
                      <span className="text-xs inline-block">
                        {isExpanded ? '▲' : '▼'}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 bg-primary-800 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 flex items-center justify-center font-display text-xl font-bold border-2 ${
                          phaseData.status === 'current'
                            ? 'bg-accent-300 text-primary-950 border-primary-950'
                            : phaseData.status === 'upcoming'
                            ? 'bg-primary-900 text-primary-300 border-primary-600'
                            : isPhaseLocked
                            ? 'bg-rose-950 text-rose-300 border-rose-500/40'
                            : 'bg-primary-950 text-primary-500 border-primary-700'
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <span
                          className={`font-mono text-[10px] uppercase tracking-widest font-bold ${
                            phaseData.status === 'current'
                              ? 'text-accent-300'
                              : phaseData.status === 'upcoming'
                              ? 'text-primary-300'
                              : isPhaseLocked
                              ? 'text-rose-400'
                              : 'text-primary-500'
                          }`}
                        >
                          {phaseData.status === 'current'
                            ? 'Active Phase'
                            : phaseData.status === 'upcoming'
                            ? 'Next Up'
                            : isPhaseLocked
                            ? 'Encrypted Stage'
                            : 'Future Vision'}
                        </span>
                        <h4 className="text-primary-100 font-bold text-sm sm:text-base mt-0.5">
                          {phaseData.title}
                        </h4>
                      </div>
                    </div>

                    {isPhaseLocked && (
                      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono font-bold">
                        <Lock className="w-3.5 h-3.5" />
                        <span>CONFIDENTIAL</span>
                      </div>
                    )}
                  </div>
                </button>

                {/* Expanded Content Area */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="border-t-2 border-primary-700 bg-primary-900 p-5 sm:p-6 relative overflow-hidden"
                    >
                      {/* Milestone Items Grid */}
                      <div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-3 select-none"
                        style={{
                          filter: isPhaseLocked
                            ? 'blur(8px)'
                            : blurVal > 0
                            ? `blur(${blurVal}px)`
                            : 'none',
                        }}
                      >
                        {phaseData.items?.map((taskItem, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="flex items-center gap-3 p-3 border-2 border-primary-700 bg-primary-800"
                          >
                            <div
                              className={`w-4 h-4 flex items-center justify-center flex-shrink-0 border-2 ${
                                taskItem.status === 'done'
                                  ? 'bg-accent-300 border-primary-950 text-primary-950'
                                  : 'border-primary-500'
                              }`}
                            >
                              {taskItem.status === 'done' && (
                                <span className="text-[10px] font-bold">✓</span>
                              )}
                            </div>
                            <span
                              className={`text-xs sm:text-sm font-mono ${
                                taskItem.status === 'done'
                                  ? 'text-primary-400 line-through'
                                  : 'text-primary-100'
                              }`}
                            >
                              {taskItem.text}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Locked Cyber Shield Overlay */}
                      {isPhaseLocked && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-primary-950/80 p-4">
                          <div className="border-2 border-rose-400 bg-primary-900 p-5 max-w-sm w-full text-center space-y-2 shadow-2xl">
                            <div className="w-9 h-9 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center mx-auto">
                              <Lock className="w-4 h-4" />
                            </div>
                            <h5 className="text-sm font-display text-primary-50 font-bold uppercase tracking-wider">
                              Phase in Stealth Mode
                            </h5>
                            <p className="text-[11px] text-primary-300 font-mono leading-relaxed">
                              Milestone specifications are confidential and locked until release.
                            </p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })
        )}
      </div>
    </Section>
  )
}
