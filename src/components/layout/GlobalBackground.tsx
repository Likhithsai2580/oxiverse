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

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 0.15, 0.08])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden bg-dark-900">
      {/* Mesh Background for depth */}
      <div className="absolute inset-0 bg-grid-white bg-[size:60px_60px] opacity-[0.015]" />

      {/* 3D Scene Layer - heavily dimmed */}
      <motion.div
        style={{ opacity: prefersReducedMotion ? 0.15 : opacity, scale, willChange: 'transform, opacity' }}
        className="absolute inset-0 block w-full h-full transform-gpu mix-blend-luminosity"
      >
        {!prefersReducedMotion && <OxiverseCore />}

        {prefersReducedMotion && (
          <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 opacity-40" />
        )}
      </motion.div>

      {/* Subtle ambient glows - using new palette */}
      <div className="absolute top-[-10%] left-[-10%] w-full h-full max-w-[600px] max-h-[600px] bg-accent-500/5 rounded-full blur-[150px] opacity-40" />
      <div className="absolute bottom-[-10%] right-[-10%] w-full h-full max-w-[600px] max-h-[600px] bg-primary-700/10 rounded-full blur-[150px] opacity-30" />
    </div>
  )
})
