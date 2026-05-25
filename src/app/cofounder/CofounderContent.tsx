'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function CofounderContent() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div className="pt-16 pb-24 px-4 md:px-8 bg-transparent">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="mb-16"
        >
          <div className="inline-block border-2 border-primary-50 px-3 py-1 mb-6 bg-primary-950">
            <span className="font-mono text-xs uppercase tracking-widest font-bold text-accent-300">
              OPERATIONAL MODEL v2.0
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black font-display text-primary-50 mb-6 uppercase tracking-tighter leading-[0.9]">
            Venture & <span className="text-accent-300 font-outline-2">Project Strategy</span>
          </h1>
          <div className="h-2 w-24 bg-accent-300 shadow-retro-sm mb-8" />
          <p className="text-xl text-primary-300 font-mono leading-relaxed max-w-3xl border-l-4 border-primary-700 pl-6 mb-6">
            I don't think I need a co-founder because I want to work solo. Instead, I am exploring opportunities for capable people to manage and scale my projects under a structured revenue-share model.
          </p>
        </motion.div>

        {/* Core Contents */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="space-y-12 font-mono text-primary-100"
        >
          {/* Section 1: The Model */}
          <section className="p-8 border-2 border-primary-700 bg-primary-900/30 rounded-lg shadow-retro-sm relative overflow-hidden group hover:border-accent-300/30 transition-all duration-300">
            <div className="absolute top-0 right-0 p-3 text-[10px] text-primary-500 font-mono">
              [ 01_THE_BUILD ]
            </div>
            <h2 className="text-2xl font-bold uppercase tracking-widest text-accent-300 mb-4 border-b border-primary-700 pb-2">
              The 6-Month Solo Sprint
            </h2>
            <p className="text-primary-200 leading-relaxed text-sm">
              My engineering velocity is maximized when working as a solo developer on the initial phases. My plan is simple: I work on a project independently for <strong>6 months</strong>—taking it from a raw concept to a fully functional, validated product with stable architecture and initial traction.
            </p>
          </section>

          {/* Section 2: The Deal */}
          <section className="p-8 border-2 border-primary-700 bg-primary-900/30 rounded-lg shadow-retro-sm relative overflow-hidden group hover:border-accent-300/30 transition-all duration-300">
            <div className="absolute top-0 right-0 p-3 text-[10px] text-primary-500 font-mono">
              [ 02_THE_HANDOFF ]
            </div>
            <h2 className="text-2xl font-bold uppercase tracking-widest text-accent-300 mb-4 border-b border-primary-700 pb-2">
              Co-founder Style Contract
            </h2>
            <p className="text-primary-200 leading-relaxed text-sm mb-4">
              Once the 6-month build cycle is completed, I hire a dedicated team under a co-founder style management contract. I hand over the project fully to this team to lead operations, user growth, and day-to-day execution.
            </p>
            <div className="bg-primary-950/50 p-4 border border-primary-700/50 rounded flex flex-col md:flex-row gap-6 md:items-center">
              <div className="flex-1">
                <span className="block text-[10px] uppercase text-primary-400 font-bold tracking-widest mb-1">Revenue Distribution</span>
                <span className="text-3xl font-black text-accent-300">60% to 70%</span>
                <span className="text-xs text-primary-200 ml-2">to the operational team</span>
              </div>
              <div className="w-px h-12 bg-primary-800 hidden md:block" />
              <div className="flex-1">
                <span className="block text-[10px] uppercase text-primary-400 font-bold tracking-widest mb-1">Founder Share</span>
                <span className="text-3xl font-black text-primary-100">30% or 40%</span>
                <span className="text-xs text-primary-300 ml-2">retained by creator</span>
              </div>
            </div>
          </section>

          {/* Section 3: Operations */}
          <section className="p-8 border-2 border-primary-700 bg-primary-900/30 rounded-lg shadow-retro-sm relative overflow-hidden group hover:border-accent-300/30 transition-all duration-300">
            <div className="absolute top-0 right-0 p-3 text-[10px] text-primary-500 font-mono">
              [ 03_THE_EXECUTION ]
            </div>
            <h2 className="text-2xl font-bold uppercase tracking-widest text-accent-300 mb-4 border-b border-primary-700 pb-2">
              Team Responsibilities
            </h2>
            <p className="text-primary-200 leading-relaxed text-sm mb-4">
              This is a partnership designed for operators. The team takes full control of the project lifecycle and handles:
            </p>
            <ul className="list-square marker:text-accent-300 pl-6 space-y-2 text-sm text-primary-200">
              <li><strong>Operational Stability:</strong> Maintaining the project's backend servers, databases, and infrastructure.</li>
              <li><strong>Feature Development:</strong> Implementing and rolling out updates and features based on my instructions and product roadmap.</li>
              <li><strong>Marketing & Growth:</strong> Driving user acquisition, handling support channels, and monetizing the platform.</li>
            </ul>
          </section>

          {/* Code Repositories */}
          <section className="mb-12">
            <h2 className="text-lg font-bold uppercase tracking-widest text-primary-300 mb-4">Check Out The Codebase</h2>
            <p className="text-sm text-primary-400 mb-6">Review the current state of our open stack repositories:</p>
            <ul className="space-y-3 pl-6 list-square marker:text-accent-300">
              <li>
                <a href="https://codeberg.org/oxiverse" target="_blank" rel="noopener noreferrer" className="text-accent-300 hover:text-primary-50 font-bold underline decoration-dashed">
                  Codeberg.org/oxiverse
                </a> (Primary development hub)
              </li>
              <li>
                <a href="https://github.com/oxiverse-ecosystem" target="_blank" rel="noopener noreferrer" className="text-accent-300 hover:text-primary-50 font-bold underline decoration-dashed">
                  Github.com/oxiverse-ecosystem
                </a> (Ecosystem mirrors)
              </li>
            </ul>
          </section>

          {/* Contact Section */}
          <section className="mb-12">
            <div className="p-8 border-2 border-accent-300/30 bg-primary-900/50 rounded-lg shadow-retro-md">
              <h3 className="text-xl font-bold text-primary-50 uppercase mb-4 tracking-wider">
                Let's Discuss Opportunities
              </h3>
              <p className="text-sm text-primary-200 leading-loose mb-6">
                If you are a builder or a team looking to take ownership of fully engineered projects and run them with complete operational freedom and a high revenue split, let's explore.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://cal.com/itxlikhith" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-accent-500 text-primary-900 font-bold uppercase tracking-wider text-sm hover:bg-accent-400 transition-all text-center shadow-retro-sm"
                >
                  Schedule a Discussion
                </a>
                <a 
                  href="mailto:likhith@oxiverse.com"
                  className="inline-block px-6 py-3 border-2 border-primary-500 text-primary-200 font-bold uppercase tracking-wider text-sm hover:border-accent-300 hover:text-accent-300 transition-all text-center"
                >
                  Email Inquiry
                </a>
              </div>
            </div>
          </section>

        </motion.div>
      </div>
    </div>
  )
}
