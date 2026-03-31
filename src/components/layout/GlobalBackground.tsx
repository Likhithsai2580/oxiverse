'use client'

import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const OxiverseCore = dynamic(() => import('@/components/3d/OxiverseCore'), {
  ssr: false,
})

export default React.memo(function GlobalBackground() {
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()

  // Dynamic opacity and zoom effects for a "deep dive" feeling
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 0.4, 0.2])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden bg-dark-950">
      {/* Mesh Background for depth */}
      <div className="absolute inset-0 bg-grid-white bg-[size:60px_60px] opacity-[0.02]" />
      
      {/* 3D Scene Layer */}
      <motion.div 
        style={{ opacity: prefersReducedMotion ? 0.3 : opacity, scale, willChange: 'transform, opacity' }}
        className="absolute inset-0 block w-full h-full transform-gpu"
      >
        {!prefersReducedMotion && <OxiverseCore />}
        
        {/* Static Fallback for Reduced Motion */}
        {prefersReducedMotion && (
          <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-primary-950/20 to-dark-950 opacity-40" />
        )}
      </motion.div>

      {/* Persistent Color Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-full h-full max-w-[800px] max-h-[800px] bg-primary-500/10 rounded-full blur-[120px] opacity-30 mix-blend-screen animate-soft-glow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-full h-full max-w-[800px] max-h-[800px] bg-accent-500/10 rounded-full blur-[120px] opacity-30 mix-blend-screen animate-soft-glow animation-delay-2000" />
    </div>
  )
})
