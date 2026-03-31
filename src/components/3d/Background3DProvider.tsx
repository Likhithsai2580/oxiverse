'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useScroll, MotionValue } from 'framer-motion'
import dynamic from 'next/dynamic'

interface Background3DContextType {
  scrollProgress: MotionValue<number>
  isReady: boolean
}

const Background3DContext = createContext<Background3DContextType | null>(null)

export const useBackground3D = () => {
  const context = useContext(Background3DContext)
  if (!context) {
    throw new Error('useBackground3D must be used within Background3DProvider')
  }
  return context
}

const GlobalBackground = dynamic(() => import('@/components/layout/GlobalBackground'), { ssr: false })

export const Background3DProvider = ({ children }: { children: React.ReactNode }) => {
  const { scrollYProgress } = useScroll()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Initial delay to avoid hydration jank
    const timer = setTimeout(() => setIsReady(true), 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Background3DContext.Provider value={{ scrollProgress: scrollYProgress, isReady }}>
      {/* Global Immersion Layer - Persistent & Fixed */}
      <GlobalBackground />
      
      {/* Content Overlay */}
      <div className="relative z-10 w-full min-h-screen">
        {children}
      </div>
    </Background3DContext.Provider>
  )
}
