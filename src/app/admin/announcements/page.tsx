'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useToastContext } from '@/lib/providers/ToastProvider'

interface Announcement {
  active: boolean
  message: string
  link: string
  linkText: string
}

export default function AnnouncementManager() {
  const [announcement, setAnnouncement] = useState<Announcement>({
    active: false,
    message: '',
    link: '',
    linkText: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { success, error } = useToastContext()

  useEffect(() => {
    fetch('/api/announcement')
      .then(res => res.json())
      .then(data => {
        setAnnouncement({
          active: data.active || false,
          message: data.message || '',
          link: data.link || '',
          linkText: data.linkText || ''
        })
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load announcement', err)
        error('Failed to load announcement data')
        setLoading(false)
      })
  }, [error])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/announcement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(announcement)
      })
      if (!res.ok) throw new Error('Failed to save')
      success('Announcement updated successfully')
    } catch (err) {
      console.error(err)
      error('Failed to update announcement')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8 space-y-6 animate-pulse">
        <div className="h-10 bg-white/5 rounded w-1/4"></div>
        <div className="h-64 bg-white/5 rounded"></div>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">
          Announcement <span className="text-primary-500 not-italic">Manager</span>
        </h1>
        <p className="text-dark-400 mt-2">Manage the global banner displayed on the hero page.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl"
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
            <div>
              <h3 className="text-white font-bold mb-1">Banner Status</h3>
              <p className="text-sm text-dark-400">Toggle whether the banner is visible to users</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={announcement.active}
                onChange={(e) => setAnnouncement({...announcement, active: e.target.checked})}
              />
              <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-bold text-dark-300 mb-2 uppercase tracking-wider">Announcement Message *</label>
            <input
              type="text"
              value={announcement.message}
              onChange={(e) => setAnnouncement({...announcement, message: e.target.value})}
              placeholder="e.g., We are looking for a Co-founder! Join us on our mission."
              className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-dark-300 mb-2 uppercase tracking-wider">Call to Action Link</label>
              <input
                type="text"
                value={announcement.link}
                onChange={(e) => setAnnouncement({...announcement, link: e.target.value})}
                placeholder="e.g., /cofounder"
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-dark-300 mb-2 uppercase tracking-wider">Call to Action Text</label>
              <input
                type="text"
                value={announcement.linkText}
                onChange={(e) => setAnnouncement({...announcement, linkText: e.target.value})}
                placeholder="e.g., Learn More"
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-primary-500 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-primary-400 transition-colors disabled:opacity-50 flex items-center"
            >
              {saving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
