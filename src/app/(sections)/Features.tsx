'use client'

import React from 'react'
import Section from '@/components/ui/Section'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80, damping: 20 } }
}

const features = [
  { id: '01', name: 'Privacy Search', description: 'Intent-driven search engine devoid of tracking, targeting, or profiling.', linkText: 'Discover Search' },
  { id: '02', name: 'Ethical Ads', description: 'Context-based advertising relying on query intent, not personal exploitation.', linkText: 'View Ad Ethics' },
  { id: '03', name: 'Data Autonomy', description: 'Total consent management with zero-retention policies. Your data remains yours.', linkText: 'Our Privacy Policy' },
  { id: '04', name: 'Open Stack', description: 'Built on Next.js, FastAPI, & Qdrant. Fully transparent and community-auditable.', linkText: 'Audit Source Code' }
]

export default function Features() {
  return (
    <Section id="products" className="py-24 bg-primary-800 relative z-10">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
        <div>
          <div className="inline-block border-2 border-primary-50 px-3 py-1 mb-6 bg-primary-950">
            <span className="font-mono text-xs uppercase tracking-widest font-bold text-accent-300">The Core</span>
          </div>
          <h2 className="font-display text-[3rem] md:text-[4.5rem] leading-[0.9] text-primary-50 tracking-tighter font-bold uppercase">
            An Uncompromising<br />
            <span className="text-accent-300">Ecosystem.</span>
          </h2>
        </div>
        <div className="pb-2">
          <p className="font-sans text-lg text-primary-300 max-w-md border-l-2 border-accent-300 pl-6 leading-relaxed">
            We abandoned the standard models of data harvesting to build a cohesive suite of tools designed exclusively for human agency.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* Large Feature / Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-8 retro-box relative h-[500px] group flex flex-col justify-between p-0 overflow-hidden"
        >
          <div className="retro-header-bar">
            <span>ECOSYSTEM_MAP.BMP</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-primary-950" />
              <div className="w-2 h-2 bg-primary-950" />
            </div>
          </div>
          <div className="relative flex-1 bg-primary-900">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-primary-950 via-transparent to-transparent" />
            <Image
              src="/oxiverse-ecosystem-2.jpg"
              alt="Ecosystem Map"
              fill
              className="object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-700"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
              <span className="block text-accent-300 font-mono text-xs uppercase tracking-widest mb-3">Live Environment</span>
              <h3 className="font-display text-3xl md:text-4xl text-primary-50 font-bold uppercase tracking-tight max-w-lg">
                Visualize the global node network.
              </h3>
            </div>
          </div>
        </motion.div>

        {/* Feature 01 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-4 retro-box p-0 flex flex-col justify-between group"
        >
          <div className="retro-header-bar">
            <span>MODULE_{features[0].id}</span>
          </div>
          <div className="p-8 flex flex-col justify-between flex-1 bg-primary-800">
            <div>
              <span className="text-accent-300 font-mono text-4xl tracking-tighter mb-4 block font-bold">
                {features[0].id}
              </span>
              <h4 className="font-display text-xl font-bold text-primary-50 mb-3 uppercase">{features[0].name}</h4>
              <p className="text-primary-300 leading-relaxed text-sm">{features[0].description}</p>
            </div>
            <Link href="#" className="mt-8 text-xs text-primary-400 font-bold uppercase tracking-widest group-hover:text-accent-300 flex items-center gap-2 font-mono">
              {features[0].linkText} <span className="text-accent-300 transform group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </div>
        </motion.div>

        {/* Rest of Features */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {features.slice(1).map((feature) => (
            <motion.div key={feature.id} variants={item} className="retro-box p-0 flex flex-col group">
              <div className="retro-header-bar">
                <span>MODULE_{feature.id}</span>
              </div>
              <div className="p-8 flex flex-col justify-between flex-1 bg-primary-800">
                <div>
                  <span className="text-accent-300 font-mono text-4xl tracking-tighter mb-4 block font-bold">
                    {feature.id}
                  </span>
                  <h4 className="font-display text-xl font-bold text-primary-50 mb-3 uppercase">{feature.name}</h4>
                  <p className="text-primary-300 leading-relaxed text-sm">{feature.description}</p>
                </div>
                <Link href="#" className="mt-8 text-xs text-primary-400 font-bold uppercase tracking-widest group-hover:text-accent-300 flex items-center gap-2 font-mono">
                  {feature.linkText} <span className="text-accent-300 transform group-hover:translate-x-2 transition-transform">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
