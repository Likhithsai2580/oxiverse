import React, { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'secondary' | 'outline' | 'sky' | 'purple'
  dot?: boolean
}

export function Badge({ className, variant = 'default', dot = false, children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-zinc-800 text-zinc-200 border-zinc-700',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    destructive: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    secondary: 'bg-zinc-900 text-zinc-400 border-zinc-800',
    outline: 'border-zinc-700/80 text-zinc-300 bg-transparent',
    sky: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  }

  const dotColors = {
    default: 'bg-zinc-400',
    success: 'bg-emerald-400',
    warning: 'bg-amber-400',
    destructive: 'bg-rose-400',
    secondary: 'bg-zinc-500',
    outline: 'bg-zinc-400',
    sky: 'bg-sky-400',
    purple: 'bg-purple-400',
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />}
      {children}
    </div>
  )
}
