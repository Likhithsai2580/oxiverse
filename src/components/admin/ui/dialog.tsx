'use client'

import React, { useEffect, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

export interface DialogProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children: ReactNode
  className?: string
  size?: 'sm' | 'default' | 'lg' | 'xl' | 'full'
}

export function Dialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
  size = 'default',
}: DialogProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-sm',
    default: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-6xl',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div
        className={cn(
          'relative w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl shadow-black/80 transition-all z-10 max-h-[90vh] flex flex-col',
          sizes[size],
          className
        )}
      >
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
          <div>
            {title && <h2 className="text-base font-bold text-white">{title}</h2>}
            {description && <p className="text-xs text-zinc-400 mt-0.5">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-y-auto pt-4 flex-1">{children}</div>
      </div>
    </div>
  )
}
