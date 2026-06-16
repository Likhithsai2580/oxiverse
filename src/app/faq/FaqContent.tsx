'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FaqItem {
  question: string
  answer: React.ReactNode
}

const faqData: FaqItem[] = [
  {
    question: "What is Oxiverse?",
    answer: "Oxiverse is a comprehensive, privacy-first ecosystem designed as a principled alternative to Big Tech platforms. We provide a suite of tools—including search, browser, email, docs, and cloud storage—built with zero tracking, full data sovereignty, and ethical design at the core."
  },
  {
    question: "How does your search engine protect my privacy?",
    answer: "At our core is IntentForge, an autonomous discovery engine utilizing \"self-healing\" search technology to provide high-utility results, such as code snippets, without user profiling or ad-clutter. Your \"intent\" is served, but it is never stored."
  },
  {
    question: "What does \"Open Source\" mean for me as a user?",
    answer: (
      <span>
        All our applications operate under the Oxiverse Community License (OCL) v1.0. This ensures our tools remain transparent, auditable, and committed to your digital footprint, serving as a private, human-centric alternative to tracking-heavy infrastructure.
      </span>
    )
  },
  {
    question: "Are your services accessible to developers and researchers?",
    answer: "Yes. We cater to privacy-conscious developers and academic researchers who require a transparent, auditable tech stack—including Next.js, FastAPI, and Qdrant—without the interference of commercial data harvesting."
  },
  {
    question: "What are your operating hours?",
    answer: "As a digital-first, 24-hour ecosystem, our infrastructure is always online, Sunday through Saturday. We are ready to serve you at any time of day."
  },
  {
    question: "How can I get in touch for support?",
    answer: (
      <div className="space-y-4">
        <p>
          You can reach our team via SMS at{" "}
          <a href="tel:+919491484790" className="text-accent-300 hover:underline hover:text-accent-200 font-bold">
            +91 94914 84790
          </a>
          . For immediate digital connection, you may also message us on WhatsApp.
        </p>
        <div className="flex flex-wrap gap-3 mt-2">
          <a
            href="https://wa.me/919491484790"
            target="_blank"
            rel="noopener noreferrer"
            className="retro-btn retro-btn-seafoam !py-1.5 !px-4 !text-xs !shadow-retro-sm"
          >
            WhatsApp Chat
          </a>
          <a
            href="sms:+919491484790"
            className="retro-btn !py-1.5 !px-4 !text-xs !shadow-retro-sm"
          >
            Send SMS
          </a>
        </div>
      </div>
    )
  },
  {
    question: "Where is Oxiverse based?",
    answer: "Oxiverse is headquartered in India. While our origins lie in developer-focused projects hosted on Codeberg, we now operate as a global ecosystem dedicated to data autonomy."
  },
  {
    question: "Why should I switch from \"Big Tech\"?",
    answer: "We challenge the \"normalization\" of algorithmic bias and data retention as the price of admission for using the web. We empower you with \"Enclave Security,\" ensuring your digital experience remains a safe haven that respects your data sovereignty."
  }
]

export default function FaqContent() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div className="pt-32 pb-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header section */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-black font-display text-primary-50 mb-6 uppercase tracking-tighter">
            System <span className="text-accent-300 font-outline-2">FAQ</span>
          </h1>
          <div className="h-2 w-24 bg-accent-300 shadow-retro-sm mb-8" />
          
          {/* Status Header Terminal Log */}
          <div className="retro-box p-0 overflow-hidden mb-8">
            <div className="retro-header-bar-dark !py-1.5 !px-4">
              <span className="text-[10px] tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-300 animate-pulse" />
                SYSTEM_SHELL_OUTPUT.LOG
              </span>
              <span className="text-[9px] font-mono text-primary-400">v1.0.0</span>
            </div>
            <div className="p-4 bg-primary-950 font-mono text-xs md:text-sm text-accent-300 leading-relaxed border-t border-primary-900">
              STATUS: FREQUENTLY ASKED QUESTIONS_ACCESSING_DATA...
            </div>
          </div>
        </motion.div>

        {/* Accordions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="space-y-4"
        >
          {faqData.map((faq, index) => {
            const isOpen = activeIndex === index
            return (
              <div
                key={index}
                className="retro-box p-0 overflow-hidden transition-all duration-200"
                style={{
                  boxShadow: isOpen ? '4px 4px 0px rgba(147, 197, 194, 0.5)' : '6px 6px 0px rgba(0,0,0,1)',
                  borderColor: isOpen ? '#93C5C2' : '#F8F9FA'
                }}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left p-5 md:p-6 bg-primary-850 hover:bg-primary-900 flex items-center justify-between gap-4 transition-colors focus:outline-none"
                >
                  <span className="text-base md:text-lg font-display font-bold text-primary-50 uppercase tracking-tight">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 text-primary-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-6 md:px-6 md:pb-6 font-mono text-sm leading-relaxed text-primary-200 border-t border-primary-900 bg-primary-900/40">
                        <div className="pt-4 border-t border-dashed border-primary-700/50">
                          {faq.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </motion.div>

        {/* Status Footer Enclave Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-12"
        >
          <div className="retro-box p-0 overflow-hidden border-accent-300/60 shadow-retro-glow">
            <div className="retro-header-bar-dark !bg-accent-950 !border-accent-950 !py-1.5 !px-4">
              <span className="text-[10px] text-accent-300 tracking-widest flex items-center gap-2 font-bold">
                🔒 ENCLAVE_STATUS: SECURE
              </span>
              <span className="text-[8px] font-mono text-accent-500 uppercase tracking-widest">SHIELD_ACTIVE</span>
            </div>
            <div className="p-6 bg-primary-950/80 backdrop-blur-md font-mono text-xs md:text-sm text-primary-200 leading-loose border-t border-accent-950">
              <p className="mb-2">
                Thank you for choosing Oxiverse. We are honored to serve as your digital safe haven. Explore, connect, and create with confidence.
              </p>
              <div className="flex items-center gap-1.5 mt-4 text-[10px] text-accent-300 font-bold uppercase tracking-widest">
                <span>SYSTEM ONLINE</span>
                <span className="w-1.5 h-3 bg-accent-300 inline-block animate-pulse" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
