import React, { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'accent'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-xs font-semibold ring-offset-zinc-950 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer'

    const variants = {
      default: 'bg-zinc-100 text-zinc-900 hover:bg-white active:scale-[0.98] shadow-sm shadow-white/10 font-bold',
      destructive: 'bg-red-500/15 text-red-400 border border-red-500/20 hover:bg-red-500/25 hover:border-red-500/30 active:scale-[0.98]',
      outline: 'border border-zinc-800 bg-zinc-900/50 text-zinc-200 hover:bg-zinc-800 hover:text-white hover:border-zinc-700 active:scale-[0.98] backdrop-blur-sm',
      secondary: 'bg-zinc-800/80 text-zinc-200 hover:bg-zinc-700 hover:text-white active:scale-[0.98]',
      ghost: 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50',
      link: 'text-sky-400 underline-offset-4 hover:underline p-0 h-auto',
      accent: 'bg-sky-500 text-white hover:bg-sky-400 shadow-md shadow-sky-500/20 font-bold active:scale-[0.98]',
    }

    const sizes = {
      default: 'h-9 px-4 py-2',
      sm: 'h-8 rounded-md px-3 text-[11px]',
      lg: 'h-10 rounded-lg px-6 text-sm',
      icon: 'h-8 w-8 rounded-lg p-0',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
