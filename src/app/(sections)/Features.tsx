'use client'

import React from 'react'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/lib/hooks/useIsMobile'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

interface Feature {
  name: string
  description: string
  icon: React.ReactNode
  color: string
}

const features: Feature[] = [
  {
    name: 'Privacy-First Search',
    description: 'Intent-driven search engine with no user tracking, discriminatory targeting, or behavioral profiling. Your queries stay private.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Ethical Ads',
    description: 'Context-based advertising without personal data collection. Ads match your query intent, not your personal profile.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Enhanced Privacy',
    description: 'GDPR-ready with consent management, data retention policies, and automatic cleanup. Your data, your control.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Open Source',
    description: 'Fully transparent and community-driven. Built on open standards with contributions welcome from everyone.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    color: 'from-orange-500 to-red-500',
  },
  {
    name: 'Modern Stack',
    description: 'Built with Next.js 14, FastAPI, PostgreSQL, Qdrant vector DB, and Go crawler. Performance meets reliability.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    color: 'from-cyan-500 to-blue-500',
  },
  {
    name: 'Ecosystem',
    description: 'Search, Browser, Download Manager, GSuite, Docs, Mail - all integrated into one cohesive privacy-first platform.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    color: 'from-indigo-500 to-purple-500',
  },
]

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
}

export default function Features() {
  const isMobile = useIsMobile(1024)

  return (
    <Section id="products" dark>
      <SectionHeader
        badge="Ecosystem"
        title="Everything You Need"
        subtitle="A complete ecosystem of privacy-first tools and services designed for the modern web."
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, type: "spring", bounce: 0.3 }}
        className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden mb-24 border border-white/10 shadow-2xl shadow-primary-500/10 group"
      >
        <Image
          src="/oxiverse-ecosystem-2.jpg"
          alt="Oxiverse Ecosystem"
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950/95 via-dark-950/25 to-transparent" />
        
        {/* Decorative elements */}
        <div className="absolute top-8 right-8 px-5 py-2.5 glass rounded-full border border-white/15 text-[11px] font-black uppercase tracking-[0.2em] text-primary-300 shadow-2xl">
          Live Ecosystem Visualization
        </div>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        {features.map((feature) => (
          <motion.div key={feature.name} variants={item}>
            <Card className={`h-full group ${!isMobile ? 'border-beam' : ''}`}>
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} mb-8 shadow-xl shadow-black/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                <div className="text-white drop-shadow-lg scale-110">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-3xl font-bold font-display text-white mb-4 group-hover:text-primary-300 transition-colors tracking-tight">
                {feature.name}
              </h3>
              <p className="text-dark-300 leading-relaxed font-medium text-lg">
                {feature.description}
              </p>
              
              <div className="mt-10 pt-8 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-primary-400 flex items-center group/btn cursor-pointer">
                  Explore Module 
                  <span className="ml-2 group-hover/btn:translate-x-2 transition-transform">→</span>
                </span>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
