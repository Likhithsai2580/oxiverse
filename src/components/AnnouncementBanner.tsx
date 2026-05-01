'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface Announcement {
  active: boolean
  message: string
  link?: string
  linkText?: string
}

export default function AnnouncementBanner() {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const res = await fetch('/api/announcement')
        if (res.ok) {
          const data = await res.json()
          setAnnouncement(data)
        }
      } catch (error) {
        console.error('Failed to fetch announcement:', error)
      }
    }
    fetchAnnouncement()
  }, [])

  useEffect(() => {
    const updateHeight = () => {
      const banner = document.getElementById('announcement-banner')
      if (isVisible && announcement?.active && banner) {
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
  }, [isVisible, announcement?.active])

  if (!announcement || !announcement.active || !isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="announcement-banner"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-0 left-0 right-0 bg-accent-500 text-primary-950 px-4 py-3 z-[60] shadow-retro-sm border-b-2 border-primary-950"
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-2 sm:gap-4 pr-8">
            <span className="font-bold font-mono text-sm tracking-wide uppercase">
              {announcement.message}
            </span>
            {announcement.link && (
              <Link 
                href={announcement.link}
                className="inline-block border-b-2 border-primary-950 font-black text-xs uppercase hover:text-white hover:border-white transition-colors whitespace-nowrap"
              >
                {announcement.linkText || 'Learn More'} →
              </Link>
            )}
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-950 hover:text-white transition-colors"
            aria-label="Close announcement"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
