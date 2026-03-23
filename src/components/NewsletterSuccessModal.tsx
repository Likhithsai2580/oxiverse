'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'

interface NewsletterSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  email: string
}

export default function NewsletterSuccessModal({ isOpen, onClose, email }: NewsletterSuccessModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-dark-950/90 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-dark-900 border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl border-beam"
            role="dialog"
            aria-modal="true"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-primary-500/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2 
                }}
                className="w-24 h-24 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-8 relative"
              >
                <div className="absolute inset-0 bg-primary-500/40 rounded-full animate-ping opacity-25" />
                <svg className="w-12 h-12 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl font-bold font-display text-white mb-4"
              >
                Welcome Aboard!
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-dark-300 text-lg mb-8"
              >
                Successfully subscribed with <span className="text-white font-medium">{email}</span>. 
                Stay tuned for the latest updates from the Oxiverse.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button 
                  onClick={onClose}
                  variant="primary" 
                  size="lg" 
                  className="w-full rounded-2xl h-[60px] text-lg font-semibold"
                >
                  Awesome!
                </Button>
              </motion.div>
            </div>

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    opacity: 0,
                    x: "50%",
                    y: "50%",
                    scale: 0
                  }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    x: `${Math.random() * 100}%`,
                    y: `${Math.random() * 100}%`,
                    scale: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    delay: 0.5 + Math.random(),
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  className={`absolute w-2 h-2 rounded-full ${
                    i % 3 === 0 ? 'bg-primary-500' : 
                    i % 3 === 1 ? 'bg-purple-500' : 'bg-blue-500'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
