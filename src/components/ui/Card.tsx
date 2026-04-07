'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`retro-box p-8 relative overflow-hidden group ${className}`}
    >
      <div className="relative z-10 bg-primary-800">
        {children}
      </div>
    </motion.div>
  )
}
