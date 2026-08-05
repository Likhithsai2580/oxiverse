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
                <span className="text-3xl font-black text-accent-300">70%</span>
                <span className="text-xs text-primary-200 ml-2">to the whole team</span>
              </div>
              <div className="w-px h-12 bg-primary-800 hidden md:block" />
              <div className="flex-1">
                <span className="block text-[10px] uppercase text-primary-400 font-bold tracking-widest mb-1">Founder Share</span>
                <span className="text-3xl font-black text-primary-100">30%</span>
                <span className="text-xs text-primary-300 ml-2">retained by creator</span>
              </div>
            </div>
            <p className="text-primary-300 leading-relaxed text-sm mt-4">
              The split is calculated on <strong>Net Revenue</strong> = Gross Revenue minus <strong>Operating Costs</strong> (infrastructure, hosting, tooling, and any direct operational spend). Costs are deducted first, then the net is divided 70/30.
            </p>
            <div className="mt-4 p-4 border border-accent-300/30 bg-primary-950/40 rounded">
              <span className="block text-[10px] uppercase text-accent-300 font-bold tracking-widest mb-2">Performance Check</span>
              <p className="text-primary-200 leading-relaxed text-sm">
                Every <strong>6 months</strong> we review the numbers. The team must show at least a <strong>5% revenue increase</strong> over the prior period to stay on the contract. A team is given <strong>2 chances in total</strong> — miss the growth target twice and the handover is reopened.
              </p>
            </div>
          </section>

          {/* Section 2b: Eligibility */}
          <section className="p-8 border-2 border-primary-700 bg-primary-900/30 rounded-lg shadow-retro-sm relative overflow-hidden group hover:border-accent-300/30 transition-all duration-300">
            <div className="absolute top-0 right-0 p-3 text-[10px] text-primary-500 font-mono">
              [ 02B_THE_TEAM ]
            </div>
            <h2 className="text-2xl font-bold uppercase tracking-widest text-accent-300 mb-4 border-b border-primary-700 pb-2">
              Who Qualifies
            </h2>
            <p className="text-primary-200 leading-relaxed text-sm mb-4">
              Team members must be <strong>full-time</strong> on Oxiverse work and must <strong>not hold other paid jobs</strong>. The only exemption is personal <strong>trading and investments</strong> — those do not disqualify a member.
            </p>
            <p className="text-primary-200 leading-relaxed text-sm">
              Within these rules, the team is free to build their own <strong>monetization strategies</strong> — as long as they stay inside the non-negotiable principles below.
            </p>
          </section>

          {/* Section 2c: The Line */}
          <section className="p-8 border-2 border-primary-700 bg-primary-900/30 rounded-lg shadow-retro-sm relative overflow-hidden group hover:border-accent-300/30 transition-all duration-300">
            <div className="absolute top-0 right-0 p-3 text-[10px] text-primary-500 font-mono">
              [ 02C_THE_LINE ]
            </div>
            <h2 className="text-2xl font-bold uppercase tracking-widest text-accent-300 mb-4 border-b border-primary-700 pb-2">
              What We Will Never Do
            </h2>
            <p className="text-primary-200 leading-relaxed text-sm mb-4">
              Every monetization path the team explores must respect these hard limits:
            </p>
            <ul className="space-y-2 text-sm text-primary-200">
              <li className="flex gap-3"><span className="text-accent-300 font-black">✕</span><span><strong>Display Advertising:</strong> No banner ads, native ads, video ads, or any impression-based monetization. Ever.</span></li>
              <li className="flex gap-3"><span className="text-accent-300 font-black">✕</span><span><strong>User Data Sales:</strong> No selling search history, click data, profiles, or inferred interests to third parties.</span></li>
              <li className="flex gap-3"><span className="text-accent-300 font-black">✕</span><span><strong>Behavioral Targeting:</strong> No cross-site tracking, fingerprinting, or building advertising profiles of any kind.</span></li>
              <li className="flex gap-3"><span className="text-accent-300 font-black">✕</span><span><strong>Surveillance Capitalism:</strong> No Google Analytics, Meta Pixel, or any third-party analytics that harvest user behavior.</span></li>
              <li className="flex gap-3"><span className="text-accent-300 font-black">✕</span><span><strong>Search Manipulation:</strong> No paid placement, sponsored results masquerading as organic, or ranking for profit.</span></li>
              <li className="flex gap-3"><span className="text-accent-300 font-black">✕</span><span><strong>Dark Patterns:</strong> No tricks to extract consent, no pre-checked boxes, no nag screens for monetization.</span></li>
              <li className="flex gap-3"><span className="text-accent-300 font-black">✕</span><span><strong>Venture Capture:</strong> No investor pressure to pivot to surveillance. Oxiverse is founder-controlled.</span></li>
              <li className="flex gap-3"><span className="text-accent-300 font-black">✕</span><span><strong>AI Training on User Data:</strong> No using queries or behavior to train models without explicit, revocable opt-in.</span></li>
            </ul>
          </section>

          {/* Section 2d: Plugin Economy */}
          <section className="p-8 border-2 border-primary-700 bg-primary-900/30 rounded-lg shadow-retro-sm relative overflow-hidden group hover:border-accent-300/30 transition-all duration-300">
            <div className="absolute top-0 right-0 p-3 text-[10px] text-primary-500 font-mono">
              [ 02D_THE_PLATFORM ]
            </div>
            <h2 className="text-2xl font-bold uppercase tracking-widest text-accent-300 mb-4 border-b border-primary-700 pb-2">
              Free Core, Open Plugin Economy
            </h2>
            <p className="text-primary-200 leading-relaxed text-sm mb-4">
              The <strong>core hand-over SaaS stays free</strong> for everyone. On top of it we ship a <strong>baseline plugin</strong> that other developers can extend to build and monetize their own features.
            </p>
            <p className="text-primary-200 leading-relaxed text-sm">
              When third-party developers earn through the plugin marketplace, Oxiverse takes a <strong>2%–5% commission</strong> — leaving the vast majority with the builder.
            </p>
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

          {/* Section 3b: How It Works */}
          <section className="p-8 border-2 border-primary-700 bg-primary-900/30 rounded-lg shadow-retro-sm relative overflow-hidden group hover:border-accent-300/30 transition-all duration-300">
            <div className="absolute top-0 right-0 p-3 text-[10px] text-primary-500 font-mono">
              [ 03B_HOW_IT_WORKS ]
            </div>
            <h2 className="text-2xl font-bold uppercase tracking-widest text-accent-300 mb-4 border-b border-primary-700 pb-2">
              How It Works
            </h2>
            <p className="text-primary-200 leading-relaxed text-sm mb-4">
              These are not contracts to sign — they are the operating models Oxiverse follows. Read how each one works:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="/operator" className="p-4 border-2 border-primary-700 bg-primary-950/40 rounded hover:border-accent-300/50 transition-all group/link">
                <span className="block text-[10px] uppercase text-primary-400 font-bold tracking-widest mb-2">01 · Partnership</span>
                <span className="text-primary-50 font-bold font-display uppercase text-sm group-hover/link:text-accent-300 transition-colors">Operator Model</span>
                <p className="text-primary-400 text-xs leading-relaxed mt-2">Autonomous project management under a revenue-share model.</p>
              </a>
              <a href="/intern" className="p-4 border-2 border-primary-700 bg-primary-950/40 rounded hover:border-accent-300/50 transition-all group/link">
                <span className="block text-[10px] uppercase text-primary-400 font-bold tracking-widest mb-2">02 · Training</span>
                <span className="text-primary-50 font-bold font-display uppercase text-sm group-hover/link:text-accent-300 transition-colors">Intern Model</span>
                <p className="text-primary-400 text-xs leading-relaxed mt-2">The validation phase that can lead to Operator status.</p>
              </a>
              <a href="/revenue" className="p-4 border-2 border-primary-700 bg-primary-950/40 rounded hover:border-accent-300/50 transition-all group/link">
                <span className="block text-[10px] uppercase text-primary-400 font-bold tracking-widest mb-2">03 · Math</span>
                <span className="text-primary-50 font-bold font-display uppercase text-sm group-hover/link:text-accent-300 transition-colors">Revenue Protocol</span>
                <p className="text-primary-400 text-xs leading-relaxed mt-2">The deterministic 4-layer formula behind the 70/30 split.</p>
              </a>
            </div>
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
