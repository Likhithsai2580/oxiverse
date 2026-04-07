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
  useEffect(() => { setIsDesktop(window.matchMedia('(pointer: fine)').matches) }, [])

  const baseStyles = 'inline-flex items-center justify-center font-bold tracking-tight transition-all duration-200 focus:outline-none overflow-hidden relative group'

  const variants = {
    primary: 'retro-btn retro-btn-seafoam',
    secondary: 'retro-btn',
    outline: 'border-2 border-primary-50 text-primary-200 hover:text-accent-300 hover:border-accent-300 bg-transparent',
    ghost: 'text-primary-300 hover:text-primary-50 hover:bg-primary-700/50',
  }

  const sizes = {
    sm: 'px-4 py-2 text-xs uppercase tracking-widest',
    md: 'px-6 py-3 text-sm uppercase tracking-[0.15em]',
    lg: 'px-10 py-5 text-base uppercase tracking-[0.2em]',
  }

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  const content = (
    <span className="relative z-10 flex items-center">
      {children}
    </span>
  )

  if (href) {
    if (href.startsWith('/')) {
      return (
        <Link href={href} className={classes} {...(props as any)}>
          {content}
        </Link>
      )
    }
    return (
      <a href={href} target={target} rel={rel} className={classes} {...(props as any)}>
        {content}
      </a>
    )
  }

  return (
    <button className={classes} {...(props as any)}>
      {content}
    </button>
  )
}
