'use client'

import React, { useState } from 'react'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import NewsletterSuccessModal from '@/components/NewsletterSuccessModal'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [subscribedEmail, setSubscribedEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubscribedEmail(email)
        setEmail('')
        setIsModalOpen(true)
      } else {
        toast.error(data.error || 'Something went wrong. Please try again.', {
          style: {
            borderRadius: '16px',
            background: '#0f172a',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
          },
        })
      }
    } catch (err) {
      toast.error('Connection failed. Please check your internet.', {
        style: {
          borderRadius: '16px',
          background: '#0f172a',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)',
        },
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Section id="community" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card className="p-12 md:p-16 border-beam">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6 tracking-tight">
              Join the Oxiverse Community
            </h2>
            <p className="text-dark-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Stay updated with the latest privacy-first tools, research, and platform updates. 
              Be part of the pioneers building the open internet.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                required
                placeholder="developer@oxiverse.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 bg-dark-900/50 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all placeholder:text-dark-500"
              />
              <Button 
                type="submit" 
                size="lg" 
                disabled={loading}
                className="min-w-[160px] h-[60px] rounded-2xl shadow-xl shadow-primary-500/20"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  'Join Now'
                )}
              </Button>
            </form>
            
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-dark-400">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest">No Spam, Ever</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest">Privacy Protected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest">Weekly Insights</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <NewsletterSuccessModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        email={subscribedEmail} 
      />
    </Section>
  )
}
