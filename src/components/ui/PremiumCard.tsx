'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PremiumCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
}

export const PremiumCard = ({ children, className, glowColor = "rgba(59, 130, 246, 0.2)" }: PremiumCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      className={cn(
        "relative p-8 rounded-3xl glass border border-white/10 overflow-hidden group transition-all duration-500",
        className
      )}
    >
      {/* Dynamic Glow Effect */}
      <div 
        className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl pointer-events-none z-0"
        style={{ background: `radial-gradient(circle at center, ${glowColor}, transparent 70%)` }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-20 transition-opacity group-hover:opacity-50">
        <div className="absolute top-4 right-4 w-1 h-4 bg-white rounded-full rotate-45" />
        <div className="absolute top-4 right-4 w-4 h-1 bg-white rounded-full rotate-45" />
      </div>
    </motion.div>
  )
}
