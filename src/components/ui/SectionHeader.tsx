import React from 'react'

interface SectionHeaderProps {
  badge?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center' | 'right'
  className?: string
}

export default function SectionHeader({ 
  badge, 
  title, 
  subtitle, 
  align = 'center',
  className = '' 
}: SectionHeaderProps) {
  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }
  
  return (
    <div className={`${alignments[align]} mb-12 ${className}`}>
      {badge && (
        <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-primary-300 bg-primary-500/10 rounded-full border border-primary-500/20">
          {badge}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && (
        <p className="text-lg text-primary-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}
