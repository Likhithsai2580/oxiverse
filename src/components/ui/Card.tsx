'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  variant?: 'retro' | 'glass' | 'default'
}

export default function Card({ children, className = '', hover = true, variant = 'default' }: CardProps) {
  const isGlass = variant === 'glass'
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`
        relative overflow-hidden group 
        ${variant === 'retro' ? 'retro-box' : ''} 
        ${variant === 'glass' ? 'bg-dark-900/40 border border-white/5 backdrop-blur-xl rounded-2xl' : ''}
        ${variant === 'default' && !className.includes('retro-box') ? 'bg-dark-900/40 border border-white/5 rounded-2xl' : ''}
        ${className}
      `}
    >
      <div className={`relative z-10 ${variant === 'retro' ? 'bg-primary-800' : ''}`}>
        {children}
      </div>
      
      {isGlass && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent pointer-events-none" />
      )}
    </motion.div>
  )
}
