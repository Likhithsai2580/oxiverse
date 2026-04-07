'use client'

import React, { useState, useRef } from 'react'
import Section from '@/components/ui/Section'
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion'

const roadmapPhases = [
  {
    phase: 'Phase 1', title: 'Foundation & Core Search', status: 'current',
    items: [
      { text: 'Privacy-first search engine', status: 'done' },
      { text: 'Intent extraction system', status: 'done' },
      { text: 'Go crawler with BadgerDB', status: 'done' },
      { text: 'Qdrant vector search integration', status: 'done' },
      { text: 'Redis caching layer (11x faster)', status: 'done' },
      { text: 'SearXNG integration', status: 'done' },
      { text: 'Basic analytics dashboard', status: 'done' },
      { text: 'Fraud detection system', status: 'done' },
      { text: 'A/B testing framework', status: 'pending' },
      { text: 'Advanced consent management', status: 'pending' },
      { text: 'Real-time WebSocket metrics', status: 'pending' },
    ],
  },
  {
    phase: 'Phase 2', title: 'Ecosystem Expansion', status: 'upcoming',
    items: [
      { text: 'Oxiverse Browser (Chromium-based)', status: 'pending' },
      { text: 'Download Manager with cloud sync', status: 'pending' },
      { text: 'GSuite alternative (Docs, Sheets, Slides)', status: 'pending' },
      { text: 'Encrypted Mail service', status: 'pending' },
      { text: 'Cross-platform mobile apps', status: 'pending' },
      { text: 'Browser extension suite', status: 'pending' },
      { text: 'API marketplace for developers', status: 'pending' },
    ],
  },
  {
    phase: 'Phase 3', title: 'Future Vision', status: 'future',
    items: [
      { text: 'Decentralized identity system', status: 'pending' },
      { text: 'AI-powered research assistant', status: 'pending' },
      { text: 'Collaborative workspace platform', status: 'pending' },
      { text: 'Open source app store', status: 'pending' },
      { text: 'Blockchain-based rewards', status: 'pending' },
    ],
  },
]

export default function Roadmap() {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end center"] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const togglePhase = (index: number) => {
    if (index === 2) return
    setExpandedPhase(expandedPhase === index ? null : index)
  }

  return (
    <Section id="roadmap" className="py-24 bg-primary-900 relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
        <div className="inline-block border-2 border-primary-50 px-3 py-1 mb-6 bg-primary-950">
          <span className="font-mono text-xs uppercase tracking-widest font-bold text-accent-300">Roadmap</span>
        </div>
        <h2 className="font-display text-[3rem] md:text-[4.5rem] leading-[0.9] text-primary-50 tracking-tighter font-bold uppercase">
          Building the <span className="text-accent-300">Future.</span>
        </h2>
        <p className="mt-6 text-primary-300 text-lg max-w-xl">Our journey to create a complete privacy-first ecosystem.</p>
      </div>

      <div ref={containerRef} className="space-y-4 max-w-4xl mx-auto px-4 md:px-8 relative">
        {roadmapPhases.map((phaseData, index) => (
          <div key={phaseData.phase} className="relative group">
            <button
              onClick={() => togglePhase(index)}
              className={`w-full text-left retro-box p-0 overflow-hidden ${index === 2 ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className={`retro-header-bar ${phaseData.status === 'current' ? '!bg-accent-300 !text-primary-950' : ''}`}>
                <span>{phaseData.phase.toUpperCase()}: {phaseData.title.toUpperCase()}</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px]">
                    {phaseData.items.filter(i => i.status === 'done').length}/{phaseData.items.length}
                  </span>
                  {index !== 2 && (
                    <motion.span
                      animate={{ rotate: expandedPhase === index ? 180 : 0 }}
                      className="inline-block"
                    >▼</motion.span>
                  )}
                </div>
              </div>
              <div className="p-6 bg-primary-800 flex items-center gap-4">
                <div className={`w-12 h-12 flex items-center justify-center font-display text-xl font-bold border-2 ${
                  phaseData.status === 'current' ? 'bg-accent-300 text-primary-950 border-primary-950' :
                  phaseData.status === 'upcoming' ? 'bg-primary-900 text-primary-300 border-primary-600' :
                  'bg-primary-950 text-primary-500 border-primary-700'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <span className={`font-mono text-[10px] uppercase tracking-widest font-bold ${
                    phaseData.status === 'current' ? 'text-accent-300' :
                    phaseData.status === 'upcoming' ? 'text-primary-400' : 'text-primary-500'
                  }`}>
                    {phaseData.status === 'current' ? 'Active Phase' : phaseData.status === 'upcoming' ? 'Next Up' : 'Future Vision'}
                  </span>
                </div>
              </div>
            </button>

            <AnimatePresence>
              {expandedPhase === index && index !== 2 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="border-2 border-t-0 border-primary-50 bg-primary-900 p-6 shadow-retro-md">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {phaseData.items.map((taskItem, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: itemIndex * 0.04 }}
                          className="flex items-center gap-3 p-3 border-2 border-primary-700 bg-primary-800 hover:border-primary-500 transition-colors"
                        >
                          <div className={`w-4 h-4 flex items-center justify-center flex-shrink-0 border-2 ${
                            taskItem.status === 'done' ? 'bg-accent-300 border-primary-950 text-primary-950' : 'border-primary-500'
                          }`}>
                            {taskItem.status === 'done' && <span className="text-[10px] font-bold">✓</span>}
                          </div>
                          <span className={`text-sm font-mono ${
                            taskItem.status === 'done' ? 'text-primary-400 line-through' : 'text-primary-100'
                          }`}>
                            {taskItem.text}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {index === 2 && (
              <div className="relative">
                <div className="blur-[4px] select-none pointer-events-none opacity-30">
                  <div className="border-2 border-t-0 border-primary-50 bg-primary-900 p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {phaseData.items.map((_, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 border-2 border-primary-700 bg-primary-800">
                          <div className="w-4 h-4 border-2 border-primary-600" />
                          <div className="h-3 w-3/4 bg-primary-700" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="retro-box p-0">
                    <div className="retro-header-bar"><span>ACCESS_DENIED</span></div>
                    <div className="px-8 py-6 bg-primary-800 text-center">
                      <span className="text-lg font-display text-primary-50 font-bold uppercase">Coming Next</span>
                      <br />
                      <span className="text-[10px] text-primary-400 uppercase tracking-widest font-mono font-bold">Locked Stage</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}
