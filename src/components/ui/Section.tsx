import React from 'react'

interface SectionProps {
  id: string
  children: React.ReactNode
  className?: string
  dark?: boolean
}

export default function Section({ id, children, className = '', dark = false }: SectionProps) {
  return (
    <section
      id={id}
      className={`py-20 px-4 ${dark ? 'bg-primary-900' : 'bg-transparent'} ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  )
}
