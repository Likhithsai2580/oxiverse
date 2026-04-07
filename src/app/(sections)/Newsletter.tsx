'use client'

import React, { useState } from 'react'
import Section from '@/components/ui/Section'
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      if (response.ok) {
        setSubscribedEmail(email)
        setEmail('')
        setIsModalOpen(true)
      } else {
        toast.error(data.error || 'Something went wrong.', {
          style: { background: '#1C1F20', color: '#F8F9FA', border: '2px solid #F8F9FA' },
        })
      }
    } catch {
      toast.error('Connection failed.', {
        style: { background: '#1C1F20', color: '#F8F9FA', border: '2px solid #F8F9FA' },
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Section id="community" className="py-24 bg-primary-800 relative z-10">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="retro-box p-0">
            <div className="retro-header-bar">
              <span>NEWSLETTER_SUBSCRIBE.EXE</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-primary-950" />
                <div className="w-2 h-2 bg-primary-950" />
              </div>
            </div>
            <div className="p-10 md:p-14 bg-primary-800 text-center">
              <h2 className="font-display text-3xl md:text-4xl text-primary-50 mb-4 font-bold uppercase tracking-tight">
                Join the Oxiverse <span className="text-accent-300">Network.</span>
              </h2>
              <p className="text-primary-300 text-base mb-10 max-w-md mx-auto leading-relaxed">
                Stay updated with the latest privacy-first tools, research, and platform updates.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-lg mx-auto">
                <input
                  type="email"
                  required
                  placeholder="developer@oxiverse.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-4 bg-primary-900 border-2 border-primary-50 text-primary-50 focus:outline-none focus:border-accent-300 transition-colors placeholder:text-primary-500 font-mono text-sm"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="retro-btn retro-btn-seafoam !shadow-none border-l-0 px-8"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-primary-950/30 border-t-primary-950 rounded-full animate-spin" />
                  ) : (
                    'Join'
                  )}
                </button>
              </form>

              <div className="mt-10 flex flex-wrap justify-center gap-8 text-primary-400">
                {['No Spam, Ever', 'Privacy Protected', 'Weekly Insights'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent-300" />
                    <span className="text-[10px] font-bold uppercase tracking-widest font-mono">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <NewsletterSuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} email={subscribedEmail} />
    </Section>
  )
}
