'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function TermsContent() {
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
            Network <span className="text-accent-300 font-outline-2">Terms</span>
          </h1>
          <div className="h-2 w-24 bg-accent-300 shadow-retro-sm mb-8" />
          <p className="text-xl text-primary-300 font-mono leading-relaxed max-w-2xl border-l-4 border-primary-700 pl-6">
            Our operational guidelines for use and participation in the Oxiverse ecosystem.
            By using these services, you agree to these fundamental tenets.
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
            <h2>Nature of the Platform</h2>
            <p>
              Oxiverse is <strong>Source Available</strong>, and fully
              <strong>Self-Hostable</strong>. We prioritize the decentralization of information tools.
              Our infrastructure is designed to protect user anonymity through zero-logging and zero-persistence — not through network-layer anonymity tools.
            </p>
          </section>

          <section className="mb-12">
            <h2>Acceptable Use & Responsibility</h2>
            <p>
              As a discovery engine, Oxiverse may surface content of all types, including illegal materials
              available on the open web. We strictly expect our users to utilize this platform for
              <strong>Educational and Research Purposes</strong> and other lawful purposes.
            </p>
            <ul>
              <li>We do not promote, endorse, or host illegal content.</li>
              <li>Users assume full legal responsibility for their interaction with the search results.</li>
              <li>Accessing or searching for prohibited materials is at your own risk and discretion.</li>
              <li>Attempting to manipulate search rankings through artificial means violates these terms.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>Network Architecture (Tor-Routing)</h2>
            <p>
              Oxiverse utilizes <strong>Tor-routing</strong> on the <strong>server side</strong> for its
              meta-search backend functionalities. Outbound queries to federated data sources are routed
              through the Tor network to prevent backend IP exhaustion, reduce rate-limiting from upstream
              providers, and maintain consistent access to a broad range of sources.
            </p>
            <ul>
              <li>Tor-routing operates exclusively at the <strong>infrastructure layer</strong> — between our servers and upstream data sources.</li>
              <li>It is <strong>not</strong> a VPN or anonymity layer for your connection to Oxiverse.</li>
              <li>Your traffic between your device and Oxiverse is handled under our standard privacy protocol (see Privacy Policy).</li>
              <li>We do not operate Tor exit nodes, hidden services (.onion), or relay infrastructure on behalf of users.</li>
            </ul>
            <p className="border-2 border-primary-700 p-4 bg-primary-900/30 text-sm italic">
              In plain terms: Tor is used so our backend can query the web without getting blocked — not to anonymize you.
              Your anonymity is protected through our zero-logging and zero-persistence architecture, not through Tor.
            </p>
          </section>

          <section className="mb-12">
            <h2>Infrastructure Limits</h2>
            <p>
              To ensure high availability and stability for every participant, we enforce <strong>Rate Limits</strong>.
              Automated traversal or excessive requests that threaten the ecosystem stability may result in
              temporary or permanent access restrictions.
            </p>
          </section>

          <section className="mb-12">
            <h2>Licensing & Rights</h2>
            <p>
              The primary codebase is <strong>Source Available</strong>. We grant <strong>full permission for
                non-commercial purposes</strong>, including community development, personal hosting, and academic
              research.
            </p>
            <p>
              For any <strong>Commercial Purposes</strong> or integrations, you must obtain explicit permission
              prior to deployment. Contact the core developer team:
            </p>
            <ul>
              <li>Likhith: <strong>likhith@oxiverse.com</strong></li>
              <li>Alternative: <strong>anony45.omnipresent@proton.me</strong></li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>Advertising & Affiliate Disclosure</h2>
            <p>
              Search results may include <strong>affiliate links</strong> to e-commerce products and services.
              When you purchase or interact through these links, Oxiverse may earn a commission at no additional
              cost to you. Affiliate links are clearly labeled and do <strong>not</strong> influence search
              ranking or result prioritization.
            </p>
            <p>
              Sponsored content, if introduced in the future, will be visually distinguished from organic results.
            </p>
          </section>

          <section className="mb-12">
            <h2>API Access</h2>
            <p>
              The search interface is and will always remain <strong>free for personal and research use</strong>.
              Programmatic API access is available via paid subscription, with pricing published on our website.
              Free-tier functionality will not be removed or degraded without reasonable notice.
            </p>
          </section>

          <section className="mb-12">
            <h2>Amendments</h2>
            <p>
              Oxiverse is a living ecosystem. These terms are subject to change over time to reflect the
              evolution of the network and its capabilities. Users are expected and encouraged to view
              this page periodically for updates.
            </p>
          </section>

          <div className="p-6 border-2 border-accent-300/30 bg-primary-900/50 mt-16 shadow-retro-md text-center">
            <p className="text-sm m-0">
              &copy; 2026 Oxiverse Infrastructure Group.<br />
              All rights reserved for core branding and commercial use.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
