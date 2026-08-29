'use client'

import React from 'react'
import { motion } from 'framer-motion'

const sections = [
  {
    id: '01_THE_PROGRAM',
    title: 'Program Intent & Scope',
    body: [
      'The Oxiverse Internship is a professional development program focused on structured learning, research, experimentation, software contribution, product development, documentation, communication, and supervised exposure to real-world systems within the Oxiverse ecosystem.',
      'This is vocational training. Interns are NOT assigned primary responsibility for production infrastructure or critical service maintenance. Contributions may be incorporated into live Oxiverse projects where appropriate and subject to review.',
      'Four mission types structure the work: Explore (market research, competitor analysis, product reviews, technical investigations), Build (small features, bug fixes, prototypes, internal tools, documentation), Experiment (new concepts, usability testing, feasibility studies), and Communicate (technical writing, public docs, community work). All assignments are bounded, supervised, and tailored to the Intern\'s capabilities and learning objectives.',
    ],
  },
  {
    id: '02_THE_STATUS',
    title: 'Compensation & Status',
    body: [
      'This is an unpaid professional development internship. The value to the Intern is supervised practical experience, technical mentorship, and the opportunity to contribute to selected Oxiverse projects. No stipend or financial compensation is promised.',
      'It is a training relationship, not employment — this does not constitute an employment contract or an offer of permanent employment.',
      'Interns receive beta access to selected Oxiverse services (subject to availability; beta services may change, be discontinued, or become public at any time), a documented contribution history, a verified Experience Certificate on successful completion, and portfolio rights for eligible work.',
    ],
  },
  {
    id: '03_THE_EVALUATION',
    title: 'Evaluation & Certification',
    body: [
      'Evaluation is based on the quality of reasoning, independent investigation, ability to turn findings into outputs, responsiveness to feedback, and alignment with the Oxiverse Constitution.',
      'Oxiverse uses AI-assisted contribution analysis, subject to human verification, to track activity. Automated systems do NOT independently determine certification or performance ratings.',
      'Eligible Interns receive a Verified Experience Certificate with a Unique ID and verification URL (https://verify.oxiverse.com/c/{certificate_id}) based on verified participation and demonstrated outputs. Promotion considers technical ability, consistency, communication, ownership, reliability, and Constitution alignment.',
    ],
  },
  {
    id: '04_THE_PATH',
    title: 'Path to Operator Status',
    body: [
      'Participation does not equate to an Oxiverse Operator Agreement. Becoming an Operator is a separate advancement requiring a distinct contract and is not guaranteed upon completion of this program.',
      'If the Intern demonstrates exceptional autonomy, technical proficiency, and commitment to the Oxiverse Constitution, they may be invited to enter the Oxiverse Operator Agreement. Completion of the internship does not guarantee promotion to Operator status.',
    ],
  },
  {
    id: '05_THE_IP',
    title: 'Intellectual Property & Portfolio Rights',
    body: [
      'Background IP — works, inventions, code, materials, or other intellectual property created or owned by the Intern before participation — remains the Intern\'s. Nothing in this program transfers ownership of Background IP to Oxiverse.',
      'Contributions to Oxiverse projects are governed by the applicable project license (the Oxiverse Community License (OCL) __OCL_VERSION__ or other specified license).',
      'Interns may include publicly disclosed contributions and their certificate in professional portfolios and resumes, provided that such disclosure does not violate confidentiality requirements.',
    ],
  },
  {
    id: '06_THE_DISCLOSURE',
    title: 'Responsible Disclosure',
    body: [
      'Oxiverse operates openly. Interns are encouraged to discuss public architecture, code, and development. However, security-sensitive information, credentials, private user data, unpublished features, and internal infrastructure stay confidential.',
      'Report security findings through security@oxiverse.com (or as Oxiverse\'s security procedures direct) and do not disclose them publicly without authorization. Portfolio rights do not authorize disclosure of any confidential information.',
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
            A professional development pathway into the ecosystem: structured learning, research, and supervised contribution before a potential move toward Operator status.
          </p>
          <p className="text-sm text-primary-400 font-mono leading-relaxed max-w-3xl border-l-4 border-primary-800 pl-6">
            This describes how the program works. It is not a contract to sign — it is the training and validation phase Oxiverse uses to grow future operators.
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
              The internship is the training ground for the Operator model. Interns who demonstrate exceptional autonomy and commitment to the Constitution may be invited to partner as operators under a revenue-share model. Operators and interns are encouraged to introduce new monetization strategies — as long as they follow the OCL License and the Oxiverse Constitution.
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