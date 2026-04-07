'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { siteConfig } from '@/config/site'
import { useEffect, useState } from 'react'

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-primary-800 retro-bg">
      
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-4 md:px-12 py-16 flex flex-col justify-center pointer-events-none">
        
        {/* Main Retro Window Box */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="retro-box w-full max-w-[1200px] mx-auto pointer-events-auto flex flex-col"
        >
          {/* Authentic Retro Header Bar */}
          <div className="retro-header-bar w-full">
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 bg-primary-950 border-2 border-primary-950 opacity-10" />
              <span>OXI_SYS_SECURE.EXE</span>
            </div>
            <div className="flex items-center gap-2">
              {['—', '□', '✕'].map((icon, i) => (
                <div key={i} className="w-6 h-6 border-2 border-primary-950 flex items-center justify-center text-xs cursor-pointer hover:bg-primary-950 hover:text-primary-50 transition-colors">
                  {icon}
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 md:p-12 lg:p-16 flex flex-col xl:flex-row gap-12 lg:gap-24 relative bg-primary-800">
            
            {/* Left Col: Stark Typography */}
            <div className="flex-1 flex flex-col justify-center">
              
              <div className="inline-block border-2 border-primary-50 px-3 py-1 mb-8 self-start bg-primary-950">
                <span className="font-mono text-xs uppercase tracking-widest font-bold text-accent-300">
                  STATUS: ENCLAVE ONLINE
                </span>
              </div>

              <h1 className="font-display text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] font-bold uppercase leading-[0.9] tracking-tighter mb-8 text-shimmer">
                <span className="block">Privacy</span>
                <span className="block text-accent-300 drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
                  Infra<span className="text-primary-50">structure_</span>
                </span>
              </h1>
              
              <p className="font-sans text-lg md:text-xl font-medium text-primary-100 max-w-xl leading-relaxed mt-4 drop-shadow-[1px_1px_0_rgba(0,0,0,1)]">
                A highly secure, decentralized ecosystem architected for builders. 
                We engineer a framework devoid of tracking and algorithmic bias.
              </p>

              {/* Flat Geometric Buttons */}
              <div className="flex flex-col sm:flex-row gap-8 mt-12">
                <Button size="lg" href={siteConfig.hero.cta.secondary.href} className="!p-0 !bg-transparent !shadow-none !border-none outline-none">
                  <div className="retro-btn retro-btn-seafoam w-full">
                    Deploy Network
                  </div>
                </Button>

                <Button size="lg" variant="outline" href={siteConfig.hero.cta.primary.href} target="_blank" className="!p-0 !bg-transparent !shadow-none !border-none outline-none">
                  <div className="retro-btn w-full">
                    Dev Access (API)
                  </div>
                </Button>
              </div>

            </div>

            {/* Right Col: CRT Diagnostics Display */}
            <div className="w-full xl:w-[400px] flex flex-col justify-center">
              
              <div className="retro-box-seafoam overflow-hidden relative">
                
                <div className="retro-header-bar-dark">
                  <span>TERMINAL_V1.0</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary-50" />
                    <div className="w-2 h-2 bg-primary-50" />
                  </div>
                </div>

                <div className="p-6 relative bg-primary-950 border-t-2 border-primary-950 min-h-[300px] font-mono text-sm font-bold uppercase tracking-wider">
                  <div className="crt-scanline" />
                  
                  <div className="relative z-10 space-y-4">
                    <div className="text-primary-50 mb-6">
                      Oxiverse Mainframe Initialize...
                      <br/>
                      Loading Security Protocol... <span className="text-accent-300">OK</span>
                    </div>

                    <div className="flex justify-between border-b-2 border-primary-800 pb-1">
                      <span className="text-primary-300">SYS_CORE</span>
                      <span className="text-accent-300 font-black">STABLE</span>
                    </div>
                    <div className="flex justify-between border-b-2 border-primary-800 pb-1">
                      <span className="text-primary-300">NET_LATENCY</span>
                      <span className="text-primary-50">12ms</span>
                    </div>
                    <div className="flex justify-between border-b-2 border-primary-800 pb-1">
                      <span className="text-primary-300">DATA_CIPHER</span>
                      <span className="text-primary-50">AES-256</span>
                    </div>
                    <div className="flex justify-between border-b-2 border-primary-800 pb-1">
                      <span className="text-primary-300">ACTIVE_NODES</span>
                      <span className="text-primary-50">2,408</span>
                    </div>
                    
                    {/* Blinking Prompt */}
                    <div className="pt-4 flex items-center gap-2 text-accent-300">
                      <span>C:\CORE&gt;</span>
                      <span className="w-3 h-[1em] bg-accent-300 animate-pulse" />
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </motion.div>

      </div>
      
    </section>
  )
}
