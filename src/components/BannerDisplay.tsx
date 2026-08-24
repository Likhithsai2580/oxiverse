'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

interface Banner {
  id: string
  title: string
  imageUrl: string | null
  message: string | null
  link: string | null
  linkText: string | null
  placement: string
  order: number
}

interface BannerDisplayProps {
  placement?: string
}

export default function BannerDisplay({ placement = 'announcement' }: BannerDisplayProps) {
  const [banners, setBanners] = useState<Banner[]>([])
  const [index, setIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch(`/api/banners?placement=${placement}`)
        if (res.ok) {
          const data = await res.json()
          setBanners(data)
        }
      } catch (error) {
        console.error('Failed to fetch banners:', error)
      }
    }
    fetchBanners()
  }, [placement])

  // Rotate multiple active banners
  useEffect(() => {
    if (banners.length <= 1) return
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % banners.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [banners.length])

  useEffect(() => {
    const updateHeight = () => {
      const banner = document.getElementById('announcement-banner')
      if (isVisible && banners.length > 0 && banner) {
        const height = banner.offsetHeight
        document.body.style.setProperty('--banner-height', `${height}px`)
        document.body.style.paddingTop = `${height}px`
      } else {
        document.body.style.setProperty('--banner-height', `0px`)
        document.body.style.paddingTop = `0px`
      }
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => {
      window.removeEventListener('resize', updateHeight)
      document.body.style.setProperty('--banner-height', `0px`)
      document.body.style.paddingTop = `0px`
    }
  }, [isVisible, banners.length, index])

  const banner = banners[index]
  if (!banner || !isVisible) return null

  const hasImage = Boolean(banner.imageUrl)
  const linkHref = banner.link || '#'

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="announcement-banner"
          key={banner.id}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-0 left-0 right-0 z-[60] shadow-retro-sm border-b-2 ${
            hasImage
              ? 'bg-primary-900 border-primary-950'
              : 'bg-accent-500 border-primary-950 text-primary-950'
          }`}
        >
          {hasImage ? (
            <Link href={linkHref} className="block relative w-full h-14 md:h-16">
              <Image
                src={banner.imageUrl!}
                alt={banner.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </Link>
          ) : (
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-2 sm:gap-4 px-4 py-3 pr-12">
              <span className="font-bold font-mono text-sm tracking-wide uppercase">
                {banner.message || banner.title}
              </span>
              {banner.link && (
                <Link
                  href={banner.link}
                  className="inline-block border-b-2 border-primary-950 font-black text-xs uppercase hover:text-white hover:border-white transition-colors whitespace-nowrap"
                >
                  {banner.linkText || 'Learn More'} →
                </Link>
              )}
            </div>
          )}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors bg-black/30 hover:bg-black/50 rounded-full p-1"
            aria-label="Close announcement"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {banners.length > 1 && (
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1.5">
              {banners.map((b, i) => (
                <button
                  key={b.id}
                  onClick={() => setIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i === index ? 'bg-white' : 'bg-white/40'
                  }`}
                  aria-label={`Show banner ${i + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}