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
  { name: 'Docs', href: 'https://docs.oxiverse.com' },
]

export default function Navigation() {
  const [isDesktop, setIsDesktop] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    setIsDesktop(window.matchMedia('(pointer: fine)').matches)

    const sections = navItems.map(item => item.href.replace('/#', '')).filter(id => id.startsWith('http') === false)
    sections.push('home')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.2, rootMargin: '-15% 0px -45% 0px' }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20)
  })

  return (
    <motion.nav
      initial={false}
      animate={{
        paddingTop: isScrolled ? "0.75rem" : "1.25rem",
        paddingBottom: isScrolled ? "0.75rem" : "1.25rem",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pointer-events-none"
    >
      <motion.div
        animate={{
          backgroundColor: isScrolled ? "rgba(2, 6, 23, 0.7)" : "rgba(2, 6, 23, 0)",
          backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
          borderColor: isScrolled ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0)",
          boxShadow: isScrolled ? "0 25px 50px -12px rgba(59, 130, 246, 0.15)" : "none",
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-8 rounded-3xl border pointer-events-auto"
      >
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 group relative z-[60]"
            onClick={() => setActiveSection('home')}
          >
            <motion.div
              {...isDesktop ? { whileHover: { rotate: 15, scale: 1.1 } } : {}}
              className="relative w-10 h-10"
            >
              <Image
                src="/favicon-256x256.png"
                alt="Oxiverse Logo"
                fill
                priority
                sizes="40px"
                className="object-contain drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
              />
            </motion.div>
            <span className="text-xl font-black font-display tracking-tight text-white group-hover:text-primary-400 transition-colors">
              OXIVERSE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, idx) => {
              const id = item.href.replace('/#', '');
              const isActive = activeSection === id;

              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05, duration: 0.5 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95, y: 0 }}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    className={`relative px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all group ${isActive ? 'text-white' : 'text-dark-300 hover:text-white'
                      }`}
                    onClick={(e) => {
                      if (item.href.startsWith('/#')) {
                        e.preventDefault();
                        const targetId = item.href.replace('/#', '');
                        const element = document.getElementById(targetId);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                          setActiveSection(targetId);
                        }
                      }
                    }}
                  >
                    {item.name}

                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute bottom-1 left-4 right-4 h-[2px] bg-primary-500 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    ) : (
                      <motion.span
                        className="absolute bottom-1 left-4 right-4 h-[2px] bg-primary-500/50 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="https://github.com/oxiverse-labs/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-2.5 text-xs font-black uppercase tracking-widest text-white bg-primary-600 hover:bg-primary-500 rounded-xl transition-all shadow-xl shadow-primary-500/20 glass border border-white/10 group overflow-hidden relative"
            >
              <span className="relative z-10 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Dev Access
              </span>
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine transition-transform duration-1000 hidden md:block" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-dark-300 hover:text-white relative z-[60]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between items-end">
              <motion.span
                animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 8 : 0, width: isMobileMenuOpen ? '100%' : '100%' }}
                className="h-[2px] w-full bg-current rounded-full"
              />
              <motion.span
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                className="h-[2px] w-3/4 bg-current rounded-full"
              />
              <motion.span
                animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -10 : 0, width: isMobileMenuOpen ? '100%' : '50%' }}
                className="h-[2px] w-full bg-current rounded-full"
              />
            </div>
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden absolute top-[calc(100%+12px)] left-0 right-0 bg-dark-950/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl z-50 overflow-hidden"
            >
              <div className="flex flex-col space-y-2">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={item.href}
                      className={`block px-6 py-4 text-sm font-bold uppercase tracking-widest rounded-2xl transition-all ${activeSection === item.href.replace('/#', '')
                        ? 'text-white bg-primary-600/20'
                        : 'text-dark-300 hover:text-white hover:bg-white/5'
                        }`}
                      onClick={(e) => {
                        setIsMobileMenuOpen(false);
                        if (item.href.startsWith('/#')) {
                          e.preventDefault();
                          const id = item.href.replace('/#', '');
                          const element = document.getElementById(id);
                          if (element) {
                            setTimeout(() => {
                              element.scrollIntoView({ behavior: 'smooth' });
                            }, 300); // Wait for menu close animation
                          }
                        }
                      }}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.05 }}
                >
                  <Link
                    href="https://github.com/itxLikhith"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center justify-center w-full px-6 py-5 text-xs font-black uppercase tracking-widest text-white bg-primary-600 hover:bg-primary-700 rounded-2xl transition-all shadow-xl shadow-primary-500/20"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Access Infrastructure
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.nav>
  )
}
