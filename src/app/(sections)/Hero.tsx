'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { useIsMobile } from '@/lib/hooks/useIsMobile'

export default function Hero() {
  const isMobile = useIsMobile(1024)

  return (
    <section id="platform" className="relative min-h-[95vh] flex items-center justify-center pt-28 overflow-hidden bg-dark-950 mesh-bg noise-bg">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-primary-950/25 to-dark-950" />
        <div className="absolute inset-0 bg-grid-white bg-[size:60px_60px] opacity-[0.03]" />
        
        {/* Animated Glow Orbs with Floating Motion - Optimized for Mobile */}
        <motion.div 
          animate={isMobile ? {} : { 
            x: [0, 100, -60, 0],
            y: [0, -60, 80, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] md:top-[-15%] left-[-10%] md:left-[-8%] w-[400px] h-[400px] md:w-[900px] md:h-[900px] bg-primary-500/15 rounded-full blur-[80px] md:blur-[180px] opacity-40 mix-blend-screen" 
        />
        <motion.div 
          animate={isMobile ? {} : { 
            x: [0, -80, 120, 0],
            y: [0, 100, -50, 0],
            scale: [0.8, 1.1, 1, 0.8],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-15%] md:bottom-[-20%] right-[-10%] md:right-[-8%] w-[400px] h-[400px] md:w-[900px] md:h-[900px] bg-accent-500/15 rounded-full blur-[80px] md:blur-[180px] opacity-40 mix-blend-screen" 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Animated Pulse Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
          className="inline-flex items-center space-x-2 px-6 py-2.5 mb-12 glass rounded-full border border-white/15 shadow-2xl shadow-primary-500/10 group cursor-default"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500 shadow-[0_0_10px_rgba(59,130,246,1)]"></span>
          </span>
          <span className="text-[11px] font-black tracking-[0.2em] uppercase text-primary-200 group-hover:text-white transition-colors">OS System: Public Beta 2.0</span>
        </motion.div>

        {/* Gradient Headline - Optimized Font Size for Mobile */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, type: "spring" }}
          className="text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] font-bold font-display tracking-tighter mb-10 leading-[0.9]"
        >
          <span className="gradient-text block mb-4">Explore.</span>
          <span className="text-white block mb-4 text-glow">Connect.</span>
          <span className="gradient-text block">Create.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, type: "spring" }}
          className="text-lg md:text-2xl text-dark-300 max-w-3xl mx-auto mb-16 leading-relaxed font-medium"
        >
          The next generation of privacy-first infrastructure. 
          A secure, decentralized ecosystem for pioneers of the open internet.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, type: "spring" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-24"
        >
          <motion.div
            whileHover={isMobile ? {} : { scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" href="https://github.com/itxLikhith" target="_blank" className="min-w-[220px] h-16 text-lg shadow-2xl shadow-primary-500/40 relative overflow-hidden group rounded-2xl">
              <span className="relative z-10">Build the Future</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 bg-[length:200%_100%] animate-gradient-shift opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={isMobile ? {} : { scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" variant="outline" href="#products" className="min-w-[220px] h-16 text-lg glass relative overflow-hidden group rounded-2xl border-white/10 hover:border-white/20">
              <span className="relative z-10 text-white">Explore Ecosystem</span>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Modern Scroll Indicator - Simplified for Mobile */}
      {!isMobile && (
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer group"
          onClick={() => {
            document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-dark-400 group-hover:text-primary-400 transition-colors">Scroll</span>
          <div className="w-6 h-10 border-2 border-dark-400 rounded-full flex justify-center group-hover:border-primary-400 transition-colors">
            <motion.div 
              animate={{ y: [4, 20, 4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-dark-400 rounded-full mt-1 group-hover:bg-primary-400 transition-colors"
            />
          </div>
        </motion.div>
      )}
    </section>
  )
}
