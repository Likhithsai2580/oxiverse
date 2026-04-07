'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'

const navItems = [
  { name: 'Platform', href: '/#ecosystem' },
  { name: 'Products', href: '/#products' },
  { name: 'Research', href: '/#research' },
  { name: 'Blog', href: '/#blog' },
  { name: 'Roadmap', href: '/#roadmap' },
  { name: 'Community', href: '/#community' },
  { name: 'Contact', href: '/#contact' },
  { name: 'Docs', href: '/docs' },
]

export default function Navigation() {
  const [isDesktop, setIsDesktop] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    setIsDesktop(window.matchMedia('(pointer: fine)').matches)
    const sections = navItems.map(item => item.href.replace('/#', '')).filter(id => !id.startsWith('http'))
    sections.push('home')
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id) }) },
      { threshold: 0.2, rootMargin: '-15% 0px -45% 0px' }
    )
    sections.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => { setIsScrolled(latest > 20) })

  return (
    <motion.nav
      initial={false}
      animate={{ paddingTop: isScrolled ? "0.5rem" : "1rem", paddingBottom: isScrolled ? "0.5rem" : "1rem" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pointer-events-none"
    >
      <motion.div
        animate={{
          backgroundColor: isScrolled ? "rgba(57, 61, 63, 0.95)" : "rgba(57, 61, 63, 0)",
          borderColor: isScrolled ? "#F8F9FA" : "transparent",
          boxShadow: isScrolled ? "4px 4px 0px rgba(0,0,0,1)" : "none",
        }}
        transition={{ duration: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-8 border-2 pointer-events-auto"
      >
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link href="/" className="flex items-center space-x-3 group relative z-[60]" onClick={() => setActiveSection('home')}>
            <div className="relative w-9 h-9">
              <Image src="/favicon-256x256.png" alt="Oxiverse Logo" fill priority sizes="36px" className="object-contain" />
            </div>
            <span className="text-lg font-black font-display tracking-tight text-primary-50 group-hover:text-accent-300 transition-colors uppercase">
              Oxiverse
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-0">
            {navItems.map((item, idx) => {
              const id = item.href.replace('/#', '')
              const isActive = activeSection === id
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-[11px] font-bold uppercase tracking-widest transition-all font-mono border-b-2 ${
                    isActive ? 'text-accent-300 border-accent-300' : 'text-primary-300 hover:text-primary-50 border-transparent hover:border-primary-50'
                  }`}
                  onClick={(e) => {
                    if (item.href.startsWith('/#')) {
                      e.preventDefault()
                      const el = document.getElementById(item.href.replace('/#', ''))
                      if (el) { el.scrollIntoView({ behavior: 'smooth' }); setActiveSection(item.href.replace('/#', '')) }
                    }
                  }}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          <div className="hidden lg:block">
            <a href="https://github.com/oxiverse-labs/" target="_blank" rel="noopener noreferrer" className="retro-btn retro-btn-seafoam !py-2 !px-5 !text-xs !shadow-retro-sm">
              Dev Access
            </a>
          </div>

          <button className="lg:hidden p-2 text-primary-300 hover:text-primary-50 relative z-[60]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <div className="w-6 h-5 flex flex-col justify-between items-end">
              <motion.span animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 8 : 0 }} className="h-[2px] w-full bg-current" />
              <motion.span animate={{ opacity: isMobileMenuOpen ? 0 : 1 }} className="h-[2px] w-3/4 bg-current" />
              <motion.span animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -10 : 0 }} className="h-[2px] w-full bg-current" />
            </div>
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="lg:hidden absolute top-[calc(100%+4px)] left-0 right-0 bg-primary-800 border-2 border-primary-50 shadow-retro-lg p-4 z-50"
            >
              <div className="flex flex-col space-y-1">
                {navItems.map((item, idx) => (
                  <Link
                    key={item.name} href={item.href}
                    className={`block px-4 py-3 text-sm font-bold uppercase tracking-widest font-mono transition-all ${
                      activeSection === item.href.replace('/#', '') ? 'text-accent-300 bg-primary-900' : 'text-primary-300 hover:text-primary-50 hover:bg-primary-900'
                    }`}
                    onClick={(e) => {
                      setIsMobileMenuOpen(false)
                      if (item.href.startsWith('/#')) {
                        e.preventDefault()
                        setTimeout(() => { document.getElementById(item.href.replace('/#', ''))?.scrollIntoView({ behavior: 'smooth' }) }, 300)
                      }
                    }}
                  >{item.name}</Link>
                ))}
                <a href="https://github.com/itxLikhith" target="_blank" rel="noopener noreferrer"
                  className="retro-btn retro-btn-seafoam mt-4 w-full text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >Access Infrastructure</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.nav>
  )
}
