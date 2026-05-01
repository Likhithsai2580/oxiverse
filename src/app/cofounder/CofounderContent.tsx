'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CofounderContent() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div className="pt-16 pb-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black font-display text-primary-50 mb-6 uppercase tracking-tighter">
            Looking for a <span className="text-accent-300 font-outline-2">Co-founder</span>
          </h1>
          <div className="h-2 w-24 bg-accent-300 shadow-retro-sm mb-8" />
          <p className="text-xl text-primary-300 font-mono leading-relaxed max-w-2xl border-l-4 border-primary-700 pl-6 mb-6">
            Join the mission to build a privacy-focused, source-available ecosystem for everyone.
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
            prose-ul:list-square prose-li:marker:text-accent-300
            prose-a:text-accent-300 hover:prose-a:text-primary-50"
        >
          <section className="mb-12">
            <h2>The Vision & Engineering Ownership</h2>
            <p>
              I excel at rapid prototyping and developing MVPs to validate bold concepts quickly. The massive opportunity here is for an engineering co-founder to step in and take full technical ownership. You will be instrumental in architecting scalable solutions, developing polished front-end experiences, and transforming these raw MVPs into robust, production-ready systems.
            </p>
            <p>
              If you thrive on solving complex engineering challenges and want to shape the architecture from the ground up, there is immense room for impact here.
            </p>
            <p>
              <strong>Location:</strong> Fully Remote. We can collaborate from anywhere in the world.
            </p>
          </section>

          <section className="mb-12">
            <h2>Core DNA</h2>
            <p>
              Our foundation is built on principles that define the identity of Oxiverse. To ensure we are fully aligned, these are the core tenets that guide every decision:
            </p>
            <ul>
              <li><strong>Privacy Focused:</strong> User privacy is our utmost priority. Privacy-by-design is embedded in everything we build.</li>
              <li><strong>Source Available Ecosystem:</strong> Our code is open for everyone to read, learn from, and audit. We build in public.</li>
              <li><strong>Consistency in Governance:</strong> Our Terms of Service, Privacy Policy, and Open Source Licensing (OCL) are crafted to protect these values.</li>
            </ul>
            <p>
              These principles are the soul of the project. A great co-founder relationship requires deep alignment on these foundational values.
            </p>
          </section>

          <section className="mb-12">
            <h2>How We Work & Equity</h2>
            <p>
              Finding the right co-founder is like a marriage. Here is the procedure I follow to make sure we are a great fit:
            </p>
            <ol className="list-decimal marker:text-accent-300 pl-6 mb-6">
              <li className="mb-2"><strong>The Trial Month:</strong> We work together on the project for about 1 month. This helps us understand our dynamics, communication, and work ethics.</li>
              <li className="mb-2"><strong>The Equity Discussion:</strong> After a successful month, we will sit down and have an open discussion about equity distribution.</li>
              <li className="mb-2"><strong>The Contract:</strong> We will then draft and sign a formal contract for a 1.5-year vesting schedule for the agreed equity.</li>
            </ol>
          </section>

          <section className="mb-12">
            <h2>Check Out The Code</h2>
            <p>Before reaching out, please review our codebase and ecosystem:</p>
            <ul>
              <li>
                <a href="https://codeberg.org/oxiverse" target="_blank" rel="noopener noreferrer">
                  Codeberg.org/oxiverse
                </a> (Primary Code Hosting)
              </li>
              <li>
                <a href="https://github.com/oxiverse-ecosystem" target="_blank" rel="noopener noreferrer">
                  Github.com/oxiverse-ecosystem
                </a> (Ecosystem & Mirrors)
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>Let's Explore the Possibilities</h2>
            <div className="p-6 border-2 border-accent-300/30 bg-primary-900/50 mt-8 shadow-retro-md">
              <p className="m-0 mb-4 text-primary-50">
                If you resonate with the vision and see yourself building the future of this ecosystem, I'd love to connect. Let's have an open conversation about the tech, the roadmap, and how we could build something great together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <a 
                  href="https://cal.com/itxlikhith" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-accent-500 text-primary-900 font-bold uppercase tracking-wider text-sm hover:bg-accent-400 transition-colors text-center shadow-retro-sm"
                >
                  Let's Grab a Coffee (Virtual)
                </a>
                <a 
                  href="mailto:likhith@oxiverse.com"
                  className="inline-block px-6 py-3 border-2 border-primary-500 text-primary-200 font-bold uppercase tracking-wider text-sm hover:border-accent-300 hover:text-accent-300 transition-colors text-center"
                >
                  Reach Out via Email
                </a>
              </div>
            </div>
          </section>

        </motion.div>
      </div>
    </div>
  )
}
