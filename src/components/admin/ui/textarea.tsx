import React, { TextareaHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="text-xs font-semibold text-zinc-300 block tracking-wide">
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <textarea
          className={cn(
            'flex min-h-[80px] w-full rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-xs text-zinc-100 shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-500 focus-visible:border-sky-500/80 disabled:cursor-not-allowed disabled:opacity-50 font-sans',
            error && 'border-red-500/50 focus-visible:ring-red-500',
            className
          )}
          ref={ref}
          {...props}
        />
        {hint && !error && <p className="text-[11px] text-zinc-500 leading-tight">{hint}</p>}
        {error && <p className="text-[11px] text-red-400 leading-tight font-medium">{error}</p>}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'
