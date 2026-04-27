'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function LicenseContent() {
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
            OCL <span className="text-accent-300 font-outline-2">License</span>
          </h1>
          <div className="h-2 w-24 bg-accent-300 shadow-retro-sm mb-8" />
          <p className="text-xl text-primary-300 font-mono leading-relaxed max-w-2xl border-l-4 border-primary-700 pl-6">
            Oxiverse Community License (OCL) v1.0. 
            Source-Available • Non-Commercial • Privacy-by-Design.
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
          <div className="p-6 border-2 border-primary-700 bg-primary-900/50 mb-12">
            <pre className="text-sm text-primary-300 whitespace-pre-wrap m-0 font-mono">
              Oxiverse Community License (OCL) v1.0{"\n"}
              Copyright © 2026 Likhith Sai Seemala
            </pre>
          </div>

          <section className="mb-12">
            <h2>1. Grant of License</h2>
            <p>
              Subject to the terms of this License, Likhith Sai Seemala ("Licensor") grants you a worldwide, non-exclusive, non-transferable, non-sublicensable license to:
            </p>
            <ul>
              <li>(a) use, copy, modify, and run the Software;</li>
              <li>(b) create derivative works of the Software;</li>
              <li>(c) share the Software and derivative works, <strong>for Non-Commercial Purposes only</strong>.</li>
            </ul>
            <p>Derivative works created under this License must also be distributed under OCL v1.0 and may not be relicensed under more permissive terms.</p>
          </section>

          <section className="mb-12">
            <h2>2. Non-Commercial Use Definition</h2>
            <p>
              <strong>"Non-Commercial Purpose"</strong> means use that is:
            </p>
            <ul>
              <li>Personal, non-monetized experimentation</li>
              <li>Educational or academic instruction</li>
              <li>Academic or non-profit research</li>
              <li>Internal evaluation within a non-revenue-generating organization</li>
              <li>Open research or community learning projects</li>
            </ul>
            <p><strong>Non-Commercial Purpose expressly excludes:</strong></p>
            <ul>
              <li>Selling, licensing, or monetizing the Software or derivatives</li>
              <li>Offering the Software as a hosted service (SaaS, API-as-a-Service, etc.)</li>
              <li>Integrating the Software into a paid product, platform, or commercial offering</li>
              <li>Using the Software for commercial consulting, client work, or agency deliverables</li>
              <li>Any activity that generates revenue, directly or indirectly, using the Software</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>3. Commercial Use Restriction</h2>
            <p>
              Any use of the Software for <strong>Commercial Purposes</strong> requires a separate, written Commercial License agreement with Licensor.
              To inquire about Commercial Licensing, contact: <a href="mailto:likhith@oxiverse.com" className="text-accent-300 hover:text-primary-50 ml-1">likhith@oxiverse.com</a>
            </p>
          </section>

          <section className="mb-12">
            <h2>4. Redistribution & Source Availability</h2>
            <p>If you distribute the Software or derivative works (even for Non-Commercial Purposes):</p>
            <ul>
              <li>(a) You must include this License in full, unmodified, with all copyright notices intact;</li>
              <li>(b) You must make the complete corresponding source code available under the same OCL v1.0 terms;</li>
              <li>(c) You may not sublicense, relicense, or distribute under different terms.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>5. Privacy-by-Design Requirement</h2>
            <p><strong>All derivative works, modifications, or redistributions of the Software must uphold privacy-by-design as a non-negotiable baseline:</strong></p>
            <ul>
              <li>(a) <strong>No Unauthorized Data Collection</strong>: You may not add tracking, telemetry, analytics, or user data collection mechanisms without explicit, informed, opt-in user consent.</li>
              <li>(b) <strong>Data Minimization</strong>: Any data processing must be limited to what is strictly necessary for the Software's core functionality.</li>
              <li>(c) <strong>User Control</strong>: Users must retain the ability to view, export, and delete any data generated or stored by the Software.</li>
              <li>(d) <strong>Enhancements Encouraged</strong>: You are free—and encouraged—to enhance privacy protections beyond this baseline (e.g., end-to-end encryption, local-first architecture, zero-knowledge proofs).</li>
              <li>(e) <strong>Transparency</strong>: Any data handling practices must be clearly documented in a human-readable privacy notice bundled with the Software.</li>
            </ul>
            <p><strong>Violation of this Privacy Requirement constitutes a material breach of this License and triggers automatic termination under Section 9.</strong></p>
          </section>

          <section className="mb-12">
            <h2>6. Contributions</h2>
            <p>Any contribution submitted to Licensor for inclusion in the Software shall be under the terms and conditions of this License. By submitting a contribution, you represent that:</p>
            <ul>
              <li>(a) You have the right to license it under OCL v1.0;</li>
              <li>(b) You grant Licensor a perpetual, worldwide, non-exclusive license to use, modify, and distribute your contribution under this License.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>7. Patent Grant</h2>
            <p>Subject to the terms of this License, Licensor grants Licensee a non-exclusive, worldwide, royalty-free license under any patent claims licensable by Licensor that are necessarily infringed by the Software alone, <strong>solely for Non-Commercial Purposes</strong>. This patent grant terminates automatically upon any commercial use without a valid Commercial License.</p>
          </section>

          <section className="mb-12">
            <h2>8. No Warranty</h2>
            <p className="uppercase">
              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. IN NO EVENT SHALL THE LICENSOR BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
            </p>
          </section>

          <section className="mb-12">
            <h2>9. Termination</h2>
            <p>
              This License automatically terminates if you violate any of its terms. Upon termination:
            </p>
            <ul>
              <li>(a) All rights granted to you cease immediately;</li>
              <li>(b) You must cease all use, distribution, and development of the Software;</li>
              <li>(c) Licensor reserves the right to pursue legal remedies for unauthorized commercial use or privacy violations.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>10. License Versions</h2>
            <p>
              Licensor may publish updated versions of this License. Existing projects may continue under the version they adopted at the time of first use. New projects should use the latest published version. Commercial License terms are negotiated separately and are not affected by public License updates.
            </p>
          </section>

          <section className="mb-12">
            <h2>11. Governing Law & Jurisdiction</h2>
            <p>
              This License shall be governed by and construed in accordance with the laws of the <strong>Republic of India</strong>, without regard to its conflict of law principles. Any disputes arising under or in connection with this License shall be subject to the exclusive jurisdiction of the courts located in <strong>Visakhapatnam, Andhra Pradesh, India</strong>.
            </p>
          </section>

          <div className="p-6 border-2 border-accent-300/30 bg-primary-900/50 mt-16 shadow-retro-md text-sm">
            <p className="m-0">
              Last Updated: April 2026<br/>
              For licensing inquiries: <a href="mailto:likhith@oxiverse.com" className="text-accent-300 hover:text-primary-50">likhith@oxiverse.com</a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
