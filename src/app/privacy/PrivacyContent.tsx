'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function PrivacyContent() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div className="pt-32 pb-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black font-display text-primary-50 mb-6 uppercase tracking-tighter">
            Privacy <span className="text-accent-300 font-outline-2">Protocol</span>
          </h1>
          <div className="h-2 w-24 bg-accent-300 shadow-retro-sm mb-8" />
          <p className="text-xl text-primary-300 font-mono leading-relaxed max-w-2xl border-l-4 border-primary-700 pl-6">
            Our commitment to radical transparency and zero-knowledge architecture. 
            Oxiverse is built on the principle that your data belongs to you, and only you.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="prose prose-invert prose-primary max-w-none font-mono text-primary-100 
            prose-headings:font-display prose-headings:uppercase prose-headings:tracking-widest
            prose-h2:text-2xl prose-h2:text-accent-300 prose-h2:border-b prose-h2:border-primary-700 prose-h2:pb-2
            prose-p:text-primary-200 prose-p:leading-loose
            prose-strong:text-primary-50 prose-strong:font-bold
            prose-ul:list-square prose-li:marker:text-accent-300"
        >
          <section className="mb-12">
            <h2>Data Retention</h2>
            <p>
              We operate under a strict <strong>Zero-Persistence Policy</strong>. We never store, cache, or archive the data 
              you send to us. When you interact with our services, your data exists only in volatile memory for the 
              duration of the request and is immediately purged upon completion.
            </p>
          </section>

          <section className="mb-12">
            <h2>Search & Discovery</h2>
            <p>
              Oxiverse does not log search queries. We do not maintain a history of your activity, nor do we 
              link search patterns to specific users. Your intent remains private, even from us.
            </p>
          </section>

          <section className="mb-12">
            <h2>IP Logging & Networking</h2>
            <p>
              We do not log visitor IP addresses. Our infrastructure is designed to facilitate anonymous 
              interaction by default. We have no way of identifying who you are based on your network signature.
            </p>
          </section>

          <section className="mb-12">
            <h2>Tor Routing & What It Means For You</h2>
            <p>
              Our backend uses <strong>Tor routing</strong> when querying upstream data sources. This is a
              server-side infrastructure decision — it has no direct effect on your connection to Oxiverse.
            </p>
            <ul>
              <li>Tor is used <strong>between our servers and external sources</strong>, not between you and us.</li>
              <li>We do not expose your traffic to the Tor network, nor do we route your requests through Tor exit nodes.</li>
              <li>We do not operate a .onion hidden service at this time.</li>
              <li>Your privacy is enforced through our zero-logging architecture — Tor is simply a backend tool for source access stability.</li>
            </ul>
            <p>
              If you wish to access Oxiverse over Tor yourself, you are free to do so using the Tor Browser.
              We do not block or discriminate against Tor exit node traffic.
            </p>
          </section>

          <section className="mb-12">
            <h2>Browser Environment & Cookies</h2>
            <p>
              Cookies used by Oxiverse are strictly for <strong>Preferences and Customizations</strong>. This 
              includes settings like display themes (Light/Dark mode) and age-filtering preferences.
            </p>
            <ul>
              <li>Cookies reside exclusively on your local device.</li>
              <li>Cookies <strong>never leave your browser</strong>—they are never transmitted to our servers or third-party endpoints.</li>
              <li>We do not use tracking pixels, fingerprinting, or cross-site identification technologies.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>Analytics & Tracking</h2>
            <p>
              Oxiverse is 100% free of third-party analytics (e.g., Google Analytics, Meta Pixel). We do not 
              track your movements across the web or build behavioral profiles. Our success is measured by 
              utility, not by harvesting user metrics.
            </p>
          </section>

          <section className="mb-12">
            <h2>Information Security</h2>
            <p>
              We only use our own results and direct federated data sources. By eliminating middle-man 
              data aggregators, we reduce the surface area for potential data leaks or unauthorized access.
            </p>
          </section>

          <div className="p-6 border-2 border-accent-300/30 bg-primary-900/50 mt-16 shadow-retro-md">
            <p className="text-sm m-0">
              Last Updated: April 2026<br/>
              For infrastructure-specific privacy inquiries, please refer to our 
              <a href="https://github.com/oxiverse-labs" className="text-accent-300 hover:text-primary-50 ml-1">GitHub documentation</a>.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
