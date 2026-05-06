'use client'

import React from 'react'
import Section from '@/components/ui/Section'
import { motion } from 'framer-motion'

const faqs = [
  {
    question: "What is Oxiverse?",
    answer: "Oxiverse is a privacy-first ecosystem of open-source products including a search engine (IntentForge), browser, and productivity tools. It is architected for transparency and operates on Privacy-by-Design principles to eliminate user tracking and algorithmic bias."
  },
  {
    question: "What is IntentForge Search?",
    answer: "IntentForge is an autonomous discovery engine that uses intent extraction and self-healing search technology. Unlike traditional search engines, it focuses on understanding the user's objective without storing personal data or building advertising profiles."
  },
  {
    question: "Where is the Oxiverse source code hosted?",
    answer: "The primary development repository for Oxiverse is hosted on Codeberg (codeberg.org/oxiverse). An official mirror is maintained on GitHub (github.com/oxiverse-ecosystem). All active development, issues, and pull requests are managed through the Codeberg organization."
  },
  {
    question: "Is Oxiverse free to use?",
    answer: "Yes, the Oxiverse ecosystem is free for users. It is licensed under the Oxiverse Community License (OCL) v1.0, which ensures the source remains available while protecting the project's privacy-first mission and community contributions."
  }
]

export default function FAQ() {
  return (
    <Section id="faq" className="py-24 bg-primary-900/30 border-y-2 border-primary-50/5 relative z-10">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="mb-12">
          <div className="inline-block border-2 border-primary-50 px-3 py-1 mb-6 bg-primary-950">
            <span className="font-mono text-xs uppercase tracking-widest font-bold text-accent-300">Discovery FAQ</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-primary-50 font-bold uppercase tracking-tighter">
            Common <span className="text-accent-300">Queries.</span>
          </h2>
          <p className="mt-4 text-primary-400 font-sans text-lg">
            Direct answers for users and discovery engines alike.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="retro-box p-0 overflow-hidden"
            >
              <div className="retro-header-bar !py-2 !px-4">
                <span className="text-[10px] tracking-widest">QUERY_LOG_{index + 1}.LOG</span>
              </div>
              <div className="p-6 bg-primary-800">
                <h3 className="text-lg font-display font-bold text-primary-50 mb-3 uppercase tracking-tight">
                  {faq.question}
                </h3>
                <p className="text-primary-300 leading-relaxed text-sm">
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs text-primary-500 font-mono uppercase tracking-widest">
            Detailed technical documentation is available on <a href="https://codeberg.org/oxiverse" className="text-accent-300 hover:underline">Codeberg</a>
          </p>
        </div>
      </div>
    </Section>
  )
}
