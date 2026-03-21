'use client'

import React from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useIsMobile } from '@/lib/hooks/useIsMobile'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  const isMobile = useIsMobile(1024)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hover || isMobile) return
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    if (isMobile) return
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        rotateX: hover && !isMobile ? rotateX : 0,
        rotateY: hover && !isMobile ? rotateY : 0,
        transformStyle: isMobile ? 'flat' : 'preserve-3d',
      }}
      className={`glass-card rounded-2xl p-8 relative overflow-hidden group ${className}`}
    >
      {/* Background Spotlight - Disabled on Mobile */}
      {hover && !isMobile && (
        <motion.div 
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{
            background: useTransform(
              [mouseXSpring, mouseYSpring],
              ([xVal, yVal]) => `radial-gradient(400px circle at ${((xVal as number) + 0.5) * 100}% ${((yVal as number) + 0.5) * 100}%, rgba(96, 165, 250, 0.12), transparent)`
            )
          }}
        />
      )}

      {/* Shine effect - Optimized for Mobile */}
      <div className={`absolute inset-0 z-0 opacity-0 ${!isMobile ? 'group-hover:opacity-10' : ''} transition-opacity bg-gradient-to-br from-white via-transparent to-transparent pointer-events-none`} />

      <div style={{ transform: isMobile ? 'none' : 'translateZ(40px)' }} className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}
