'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}

type ButtonProps = BaseButtonProps & (
  | { href?: string; target?: string; rel?: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>
  | { href?: never; target?: never; rel?: never } & React.ButtonHTMLAttributes<HTMLButtonElement>
)

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  href,
  target,
  rel,
  ...props
}: ButtonProps) {
  const [isDesktop, setIsDesktop] = useState(false)
  
  useEffect(() => {
    setIsDesktop(window.matchMedia('(pointer: fine)').matches)
  }, [])

  const baseStyles = 'inline-flex items-center justify-center font-bold tracking-tight rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900 overflow-hidden relative group'

  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500 shadow-xl shadow-primary-500/20 border border-white/10 flex-shrink-0',
    secondary: 'bg-accent-600 hover:bg-accent-700 text-white focus:ring-accent-500 shadow-xl shadow-accent-500/20 border border-white/10 flex-shrink-0',
    outline: 'border-2 border-primary-500/30 text-primary-400 hover:text-white hover:border-primary-500/60 focus:ring-primary-500 glass flex-shrink-0',
    ghost: 'text-dark-300 hover:text-white hover:bg-white/5 focus:ring-dark-500 flex-shrink-0',
  }

  const sizes = {
    sm: 'px-4 py-2 text-xs uppercase tracking-widest',
    md: 'px-6 py-3 text-sm uppercase tracking-[0.15em]',
    lg: 'px-10 py-5 text-base uppercase tracking-[0.2em]',
  }

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  const content = (
    <>
      <span className="relative z-10 flex items-center">
        {children}
      </span>
      {/* Premium hover shine - Only visible on hover supported devices via CSS */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine transition-transform duration-1000 hidden md:block" />
    </>
  )

  const hoverProps = isDesktop ? { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } } : {}

  if (href) {
    if (href.startsWith('/')) {
      return (
        <motion.div {...hoverProps} className="inline-block flex-shrink-0">
          <Link href={href} className={classes} {...(props as any)}>
            {content}
          </Link>
        </motion.div>
      )
    }
    return (
      <motion.div {...hoverProps} className="inline-block flex-shrink-0">
        <a href={href} target={target} rel={rel} className={classes} {...(props as any)}>
          {content}
        </a>
      </motion.div>
    )
  }

  return (
    <motion.button 
      {...hoverProps}
      className={classes} 
      {...(props as any)}
    >
      {content}
    </motion.button>
  )
}
