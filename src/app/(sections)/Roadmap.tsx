'use client'

import React, { useState, useRef } from 'react'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion'

const roadmapPhases = [
  {
    phase: 'Phase 1',
    title: 'Foundation & Core Search',
    status: 'current',
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
    phase: 'Phase 2',
    title: 'Ecosystem Expansion',
    status: 'upcoming',
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
    phase: 'Phase 3',
    title: 'Future Vision',
    status: 'future',
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"]
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const togglePhase = (index: number) => {
    if (index === 2) return // Phase 3 stays collapsed
    setExpandedPhase(expandedPhase === index ? null : index)
  }

  return (
    <Section id="roadmap" dark>
      <SectionHeader
        badge="Roadmap"
        title="Building the Future"
        subtitle="Our journey to create a complete privacy-first ecosystem."
      />
      
      <div ref={containerRef} className="space-y-6 max-w-4xl mx-auto relative">
        
        {/* Global Continuous Animated Connecting Line */}
        <div className="absolute left-[34px] sm:left-[38px] top-[40px] bottom-[40px] w-[2px] z-0 hidden sm:block">
          <div className="absolute inset-0 bg-dark-800 rounded-full" />
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute inset-0 w-full bg-gradient-to-b from-primary-500 via-accent-500 to-primary-400 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]" 
          />
          {/* Animated Glow Bead */}
          <motion.div
            style={{ 
              top: useTransform(scaleY, [0, 1], ["0%", "100%"]),
              y: "-50%"
            }}
            className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_20px_#fff,0_0_40px_#3b82f6] z-10"
          />
        </div>

        {roadmapPhases.map((phaseData, index) => (
          <div key={phaseData.phase} className="relative group">
            {/* Phase Header */}
            <motion.button
              whileHover={{ scale: index === 2 ? 1 : 1.01 }}
              whileTap={{ scale: index === 2 ? 1 : 0.99 }}
              onClick={() => togglePhase(index)}
              className={`w-full text-left p-6 sm:p-8 rounded-3xl border transition-all z-10 relative overflow-hidden backdrop-blur-sm ${
                index === 2
                  ? 'bg-dark-900/40 border-dark-800 cursor-not-allowed'
                  : expandedPhase === index
                  ? 'bg-primary-950/20 border-primary-500/40 shadow-2xl shadow-primary-500/10'
                  : 'bg-dark-900/50 border-white/5 hover:border-white/20 cursor-pointer hover:bg-dark-800/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  
                  {/* Glowing Node Indicator */}
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center font-bold font-display text-lg relative z-10 transition-colors ${
                    phaseData.status === 'current'
                      ? 'bg-gradient-to-br from-primary-500 to-accent-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]'
                      : phaseData.status === 'upcoming' 
                      ? 'bg-dark-800 text-dark-300 border border-dark-600 group-hover:border-primary-500/30'
                      : 'bg-dark-950 text-dark-600 border border-dark-800'
                  }`}>
                    {index + 1}
                    {phaseData.status === 'current' && (
                      <motion.div 
                        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 rounded-2xl bg-primary-400 z-[-1]" 
                      />
                    )}
                  </div>
                  
                  <div>
                    <h3 className={`text-xl sm:text-3xl font-bold font-display tracking-tight ${
                      index === 2 ? 'text-dark-500' : 'text-white'
                    }`}>
                      {phaseData.phase}: {phaseData.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-3">
                      {phaseData.status === 'current' && (
                        <Badge variant="success" size="sm" className="shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                          Active Phase
                        </Badge>
                      )}
                      {phaseData.status === 'upcoming' && (
                        <Badge variant="pending" size="sm">
                          Next Up
                        </Badge>
                      )}
                      {phaseData.status === 'future' && (
                        <Badge size="sm" variant="default">
                          Future Vision
                        </Badge>
                      )}
                      <span className="text-[11px] font-bold text-dark-400 uppercase tracking-widest bg-dark-900 px-3 py-1 rounded-full border border-dark-700">
                        {phaseData.items.filter(i => i.status === 'done').length} / {phaseData.items.length} Tasks
                      </span>
                    </div>
                  </div>
                </div>
                {index !== 2 && (
                  <motion.div
                    animate={{ rotate: expandedPhase === index ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      expandedPhase === index ? 'bg-primary-500/20 text-primary-400' : 'bg-white/5 text-dark-400 group-hover:bg-white/10 group-hover:text-white'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                )}
              </div>
            </motion.button>

            {/* Phase Content */}
            <AnimatePresence>
              {expandedPhase === index && index !== 2 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  className="overflow-hidden sm:pl-10" // Indent content slightly on desktop to align with nodes visually
                >
                  <div className="mt-4 p-6 sm:p-8 bg-dark-900/60 backdrop-blur-md border border-white/5 rounded-3xl space-y-4 shadow-xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {phaseData.items.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: itemIndex * 0.05 }}
                          className="flex items-center space-x-4 p-4 rounded-xl bg-dark-800/50 hover:bg-dark-700/80 transition-all group cursor-default border border-transparent hover:border-white/5"
                        >
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                            item.status === 'done' 
                              ? 'bg-green-500/20 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.2)]' 
                              : 'bg-primary-500/10 text-primary-500 border border-primary-500/20'
                          }`}>
                            {item.status === 'done' ? (
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                            )}
                          </div>
                          <span className={`text-sm font-medium ${
                            item.status === 'done' ? 'text-dark-500 line-through decoration-dark-600' : 'text-white'
                          }`}>
                            {item.text}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Phase 3 Blurred Overlay */}
            {index === 2 && (
              <div className="relative mt-4 sm:pl-10">
                <div className="blur-[6px] select-none pointer-events-none opacity-30">
                  <div className="p-8 bg-dark-900/60 rounded-3xl border border-white/5 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {phaseData.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center space-x-4 p-4 rounded-xl bg-dark-800/50">
                          <div className="w-6 h-6 rounded-full bg-dark-700/50" />
                          <div className="h-4 w-3/4 bg-dark-700/50 rounded" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-dark-950/80 backdrop-blur-xl px-10 py-6 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(139,92,246,0.15)] flex flex-col items-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-dark-800 flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <span className="text-xl font-bold gradient-text mb-1">Coming Next</span>
                    <span className="text-xs text-dark-400 uppercase tracking-widest font-black">Locked Stage</span>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}
