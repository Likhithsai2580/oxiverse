'use client'

import React from 'react'
import { motion } from 'framer-motion'

const sections = [
  {
    id: '01_THE_PROGRAM',
    title: 'Program Intent & Scope',
    body: [
      'The Oxiverse Internship is a high-intensity, "real-world" startup environment focused on service maintenance, infrastructure stability, and autonomous project management.',
      'Mission Alignment — all work performed must strictly adhere to the Oxiverse Constitution, including the prohibition of display advertising, user data sales, and surveillance capitalism.',
      'Interns contribute to production-grade systems used within the Oxiverse ecosystem rather than simulated training projects, gaining hands-on experience maintaining live startup services governed by the Oxiverse Community License (OCL) __OCL_VERSION__.',
    ],
  },
  {
    id: '02_THE_STATUS',
    title: 'Compensation & Status',
    body: [
      'Internship is unpaid. The primary value is access to guidance, code review, documentation and feedback, real-world service maintenance experience, and a performance-based path to potential partnership.',
      'The internship is not an employment relationship. It is a vocational training and validation period.',
    ],
  },
  {
    id: '03_THE_EVALUATION',
    title: 'Evaluation & Certification',
    body: [
      'Oxiverse maintains an AI-assisted contribution history based on commits, pull requests, issues, documentation, operational logs, and project activity.',
      'Based on the summarized activity, Oxiverse issues a formal Experience Certificate — a verified record of technical contributions and startup maintenance capabilities. It includes metrics such as internship duration, repositories contributed to, commits, issues resolved, features implemented, operational responsibilities, an AI-generated contribution summary, and Founder verification.',
      'Promotion decisions consider technical ability, consistency, communication, ownership, reliability, and alignment with the Oxiverse Constitution.',
    ],
  },
  {
    id: '04_THE_PATH',
    title: 'Path to Operator Status',
    body: [
      'The internship serves as a vetting phase for the Oxiverse Operator model.',
      'If the intern demonstrates exceptional autonomy, technical proficiency, and commitment to the Oxiverse Constitution, they may be invited to become an Operator. Completion of the internship does not guarantee promotion.',
    ],
  },
  {
    id: '05_THE_IP',
    title: 'Intellectual Property',
    body: [
      'All contributions made as part of the internship become part of the projects and remain governed by the applicable Oxiverse Community License (OCL) or other project license where explicitly specified.',
    ],
  },
  {
    id: '06_THE_DISCLOSURE',
    title: 'Responsible Disclosure',
    body: [
      'Oxiverse operates openly. Interns are encouraged to discuss public architecture, code, and development. However, security-sensitive information, credentials, private user data, and undisclosed vulnerabilities must be handled responsibly and not publicly disclosed until resolved.',
    ],
  },
]

export default function InternContent({ version }: { version: string }) {
  const vSections = sections.map((s) => ({
    ...s,
    body: s.body.map((line) => line.replaceAll('__OCL_VERSION__', version)),
  }))
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
            The <span className="text-accent-300 font-outline-2">Intern</span> Model
          </h1>
          <div className="h-2 w-24 bg-accent-300 shadow-retro-sm mb-8" />
          <p className="text-xl text-primary-300 font-mono leading-relaxed max-w-3xl border-l-4 border-primary-700 pl-6 mb-6">
            A monitored pathways into the ecosystem: contributing to live production systems and validating skills before a move toward Operator status.
          </p>
          <p className="text-sm text-primary-400 font-mono leading-relaxed max-w-3xl border-l-4 border-primary-800 pl-6">
            This is how the program works. It is not a contract to sign — it is the training and validation phase Oxiverse uses to grow future operators.
          </p>
        </motion.div>

        {/* Core Contents */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="space-y-12 font-mono text-primary-100"
        >
          {vSections.map((section) => (
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

          {/* Path banner */}
          <section className="p-8 border-2 border-accent-300/30 bg-primary-900/50 rounded-lg shadow-retro-md">
            <h3 className="text-xl font-bold text-primary-50 uppercase mb-4 tracking-wider">
              Where It Leads
            </h3>
            <p className="text-sm text-primary-200 leading-loose mb-6">
              The internship is the vetting ground for the Operator model. Interns who demonstrate exceptional autonomy and commitment to the Constitution are invited to partner as operators under a revenue-share model. Operators and interns are encouraged to introduce new monetization strategies — as long as they follow the OCL License and the Oxiverse Constitution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/operator"
                className="inline-block px-6 py-3 bg-accent-500 text-primary-900 font-bold uppercase tracking-wider text-sm hover:bg-accent-400 transition-all text-center shadow-retro-sm"
              >
                Operator Model
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