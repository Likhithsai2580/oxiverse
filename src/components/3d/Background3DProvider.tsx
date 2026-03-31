'use client'

import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { ScrollReactiveScene } from './ScrollReactiveScene'

interface Background3DContextType {
  scrollProgress: number
}

const Background3DContext = createContext<Background3DContextType | null>(null)

export const useBackground3D = () => {
  const context = useContext(Background3DContext)
  if (!context) {
    throw new Error('useBackground3D must be used within Background3DProvider')
  }
  return context
}

export const Background3DProvider = ({ children }: { children: React.ReactNode }) => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      setScrollProgress(progress)
    }

    // Initial update
    updateScrollProgress()

    // Listen to scroll events with rAF for performance
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollProgress()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Mark as loaded after a short delay to avoid jank
    setTimeout(() => setIsLoaded(true), 100)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Background3DContext.Provider value={{ scrollProgress }}>
      {/* Fixed 3D Background */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ 
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 1s ease-out'
        }}
      >
        <ScrollReactiveScene scrollProgress={scrollProgress} />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </Background3DContext.Provider>
  )
}
