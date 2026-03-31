'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { siteConfig } from '@/config/site'
import dynamic from 'next/dynamic'

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="home" className="relative min-h-[95vh] flex items-center justify-center pt-28 overflow-hidden bg-transparent">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0 bg-transparent">
        <div className="absolute inset-0 bg-grid-white bg-[size:60px_60px] opacity-[0.02]" />
        
        {/* 3D Scene moved to GlobalBackground in layout.tsx */}


        {/* Static Glow Fallbacks - Mobile & Reduced Motion */}
        <div className="lg:hidden absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-primary-500/15 rounded-full blur-[80px] opacity-40 mix-blend-screen" />
        <div className="lg:hidden absolute bottom-[-15%] right-[-10%] w-[400px] h-[400px] bg-accent-500/15 rounded-full blur-[80px] opacity-40 mix-blend-screen" />
        
        {/* Deep fallback for desktop reduced motion */}
        {prefersReducedMotion && (
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-br from-dark-950 via-primary-950/20 to-dark-950" />
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center pointer-events-none">
        
        {/* Animated Pulse Badge */}
        <motion.div 
          style={{ willChange: 'transform, opacity' }}
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1, z: 0 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
          className="inline-flex items-center space-x-2 px-6 py-2.5 mb-12 glass rounded-full border border-white/10 shadow-2xl shadow-primary-500/10 group cursor-default transform-gpu pointer-events-auto backdrop-blur-md bg-dark-900/40"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500 shadow-[0_0_10px_rgba(59,130,246,1)]"></span>
          </span>
          <span className="text-[11px] font-black tracking-[0.2em] uppercase text-primary-200">{siteConfig.hero.badge}</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          style={{ willChange: 'transform, opacity' }}
          initial={{ opacity: 0, scale: 0.9, y: prefersReducedMotion ? 0 : 30 }}
          animate={{ opacity: 1, scale: 1, y: 0, z: 0 }}
          transition={{ duration: 0.5, delay: 0.1, type: "spring" }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-bold font-display tracking-tighter mb-8 leading-[1.1] transform-gpu mx-auto max-w-[1000px] pointer-events-auto"
        >
          <span className="text-white block">Privacy-first infrastructure</span>
          <span className="gradient-text block mt-2 relative overflow-hidden group">
            for the open internet
            <motion.span 
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ 
                repeat: Infinity, 
                duration: 3, 
                ease: "linear",
                repeatDelay: 2
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
            />
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          style={{ willChange: 'transform, opacity' }}
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0, z: 0 }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
          className="text-lg md:text-2xl text-dark-300 max-w-3xl mx-auto mb-16 leading-relaxed font-medium transform-gpu pointer-events-auto backdrop-blur-sm z-10"
        >
          Oxiverse is a secure, decentralized ecosystem for builders and researchers who want an open internet without tracking or exploitation.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          style={{ willChange: 'transform, opacity' }}
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0, z: 0 }}
          transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24 transform-gpu pointer-events-auto"
        >
          <Button size="lg" href={siteConfig.hero.cta.secondary.href} className="min-w-[220px] h-16 text-lg shadow-2xl shadow-primary-500/40 relative overflow-hidden group rounded-2xl">
            <span className="relative z-10">Explore Ecosystem</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 bg-[length:200%_100%] animate-gradient-shift opacity-0 group-hover:opacity-100 transition-opacity hidden md:block" />
          </Button>
          
          <Button size="lg" variant="outline" href={siteConfig.hero.cta.primary.href} target="_blank" className="min-w-[220px] h-16 text-lg bg-dark-900/50 backdrop-blur-md relative overflow-hidden group rounded-2xl border-white/10 hover:border-white/20">
            <span className="relative z-10 text-white">Get Dev Access</span>
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block" />
          </Button>
        </motion.div>
      </div>

      {/* Modern Scroll Indicator */}
      <motion.div 
        style={{ willChange: 'transform' }}
        animate={prefersReducedMotion ? {} : { y: [0, 8, 0], z: 0 }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="hidden md:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 flex-col items-center space-y-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer group transform-gpu z-20 pointer-events-auto"
        onClick={() => {
          document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        <span className="text-[10px] font-bold uppercase tracking-widest text-dark-300 group-hover:text-primary-400 transition-colors">Scroll</span>
        <div className="w-6 h-10 border-2 border-dark-600 rounded-full flex justify-center group-hover:border-primary-400 transition-colors bg-dark-950/50 backdrop-blur-sm">
          <motion.div 
            style={{ willChange: 'transform' }}
            animate={prefersReducedMotion ? {} : { y: [4, 20, 4], z: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-dark-400 rounded-full mt-1 group-hover:bg-primary-400 transition-colors transform-gpu"
          />
        </div>
      </motion.div>
    </section>
  )
}
