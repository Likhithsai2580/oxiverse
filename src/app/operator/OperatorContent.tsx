'use client'

import React from 'react'
import { motion } from 'framer-motion'

const sections = [
  {
    id: '01_THE_BUILD',
    title: 'The Build Cycle',
    body: [
      'Oxiverse works in a 6-month Solo Sprint: a project goes from raw concept to a fully functional, validated product with stable architecture and initial traction. Once complete, the project is handed fully to the Operator team for operations, growth, and execution.',
      'Operators are encouraged to invent new monetization strategies, provided they strictly adhere to the Oxiverse Constitution and the OCL License. The core SaaS remains free; monetization is built through premium plugins, Sovereign Commerce (affiliates), or Developer APIs.',
    ],
  },
  {
    id: '02_THE_TEAM',
    title: 'Team Structure & Exclusivity',
    body: [
      'A team is composed of a maximum of five (5) full-time members, with one member designated as the "Leader" each month. Members must not hold other paid jobs; personal trading and investments are the only permitted exemptions.',
      'The team is responsible for a minimum 5% revenue increase every six months.',
    ],
  },
  {
    id: '03_THE_SPLIT',
    title: 'Revenue Distribution',
    body: [
      'The split is calculated on Net Revenue = Gross Revenue minus Operating Costs (infrastructure, hosting, tooling, and any direct operational spend).',
      '30% is retained by Oxiverse Systems LLP for core R&D and non-monetized services. The ORDP (Oxiverse Revenue Distribution Protocol) is then applied to the remaining 70% to distribute it among the team via peer voting.',
    ],
  },
  {
    id: '04_THE_CYCLE',
    title: 'The End-of-Month Cycle',
    body: [
      'Day 1 — AI summarizes commits; members report monthly targets vs. achievements.',
      'Day 2 — Anonymous peer voting on a points-based portal. Members allocate points to others (max 30% to any one person); all allocated points must be used fully.',
      'Day 3 — Allocation of base funds and performance bonuses. The member with the highest peer evaluation points is designated as the Leader for the following month.',
    ],
  },
  {
    id: '05_THE_IP',
    title: 'Licensing & Intellectual Property',
    body: [
      'All Oxiverse services are governed by the Oxiverse Community License (OCL) v1.0. Core logic — including the core engine, RAVANA architecture, and search ranking — must remain under OCL v1.0.',
      'The core software remains the property of Oxiverse Systems LLP. Derivatives and extensions created by the team are subject to Section 6 of the OCL (Contributions).',
    ],
  },
  {
    id: '06_THE_CHECK',
    title: 'Performance Checks & Termination',
    body: [
      'The 5% Rule — every six months, the team must show a 5% revenue increase over the prior period.',
      'If the target is missed twice, the handoff is reopened and the team\'s access is revoked to allow a new team to manage the project.',
      'A 10-day notice period is required for any member leaving the team to ensure operational continuity.',
      'Any violation of the Constitution or OCL License results in immediate termination of the arrangement and cessation of all rights to the revenue split.',
    ],
  },
]

export default function OperatorContent() {
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
              HOW IT WORKS
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black font-display text-primary-50 mb-6 uppercase tracking-tighter leading-[0.9]">
            The <span className="text-accent-300 font-outline-2">Operator</span> Model
          </h1>
          <div className="h-2 w-24 bg-accent-300 shadow-retro-sm mb-8" />
          <p className="text-xl text-primary-300 font-mono leading-relaxed max-w-3xl border-l-4 border-primary-700 pl-6 mb-6">
            Autonomous project management under a revenue-share model. A partnership, not employment — operators run validated technology stacks bounded by the Oxiverse Constitution.
          </p>
          <p className="text-sm text-primary-400 font-mono leading-relaxed max-w-3xl border-l-4 border-primary-800 pl-6">
            This is how the model works. It is not a contract to sign — it is the operating structure Oxiverse follows when a project is handed to a team.
          </p>
        </motion.div>

        {/* Core Contents */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="space-y-12 font-mono text-primary-100"
        >
          {sections.map((section) => (
            <section
              key={section.id}
              className="p-8 border-2 border-primary-700 bg-primary-900/30 rounded-lg shadow-retro-sm relative overflow-hidden group hover:border-accent-300/30 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 p-3 text-[10px] text-primary-500 font-mono">
                [ {section.id} ]
              </div>
              <h2 className="text-2xl font-bold uppercase tracking-widest text-accent-300 mb-4 border-b border-primary-700 pb-2">
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.body.map((para, i) => (
                  <p key={i} className="text-primary-200 leading-relaxed text-sm">
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}

          {/* Constitution Banner */}
          <section className="p-8 border-2 border-accent-300/30 bg-primary-900/50 rounded-lg shadow-retro-md">
            <h3 className="text-xl font-bold text-primary-50 uppercase mb-4 tracking-wider">
              The Oxiverse Constitution
            </h3>
            <p className="text-sm text-primary-200 leading-loose mb-4">
              Every monetization path, feature update, and operational decision must respect these hard limits. Violation of any point terminates the handoff immediately.
            </p>
            <ul className="space-y-2 text-sm text-primary-200">
              <li className="flex gap-3"><span className="text-red-400 font-black">✕</span><span><strong>No Display Advertising:</strong> No banner ads, native ads, video ads, or any impression-based monetization. Ever.</span></li>
              <li className="flex gap-3"><span className="text-red-400 font-black">✕</span><span><strong>No User Data Sales:</strong> No selling search history, click data, profiles, or inferred interests.</span></li>
              <li className="flex gap-3"><span className="text-red-400 font-black">✕</span><span><strong>No Behavioral Targeting:</strong> No cross-site tracking or building advertising profiles.</span></li>
              <li className="flex gap-3"><span className="text-red-400 font-black">✕</span><span><strong>No Surveillance Capitalism:</strong> No third-party analytics (e.g., Google Analytics, Meta Pixel).</span></li>
              <li className="flex gap-3"><span className="text-red-400 font-black">✕</span><span><strong>No Search Manipulation:</strong> No paid placements or sponsored results masquerading as organic.</span></li>
              <li className="flex gap-3"><span className="text-red-400 font-black">✕</span><span><strong>No Dark Patterns:</strong> No tricks to extract consent or nag screens for monetization.</span></li>
              <li className="flex gap-3"><span className="text-red-400 font-black">✕</span><span><strong>No Venture Capture:</strong> Oxiverse Systems LLP-controlled; no investor pressure to pivot to surveillance.</span></li>
              <li className="flex gap-3"><span className="text-red-400 font-black">✕</span><span><strong>No AI Training on User Data:</strong> No training models on user queries without explicit, revocable opt-in.</span></li>
            </ul>
            <div className="mt-6 pt-6 border-t border-primary-700 flex flex-col sm:flex-row gap-4">
              <a
                href="/revenue"
                className="inline-block px-6 py-3 bg-accent-500 text-primary-900 font-bold uppercase tracking-wider text-sm hover:bg-accent-400 transition-all text-center shadow-retro-sm"
              >
                Revenue Protocol
              </a>
              <a
                href="/cofounder"
                className="inline-block px-6 py-3 border-2 border-primary-500 text-primary-200 font-bold uppercase tracking-wider text-sm hover:border-accent-300 hover:text-accent-300 transition-all text-center"
              >
                Project Strategy
              </a>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  )
}