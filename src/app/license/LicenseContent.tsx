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
            <p>Derivative works must be distributed under a license approved by the Open Source Initiative (OSI). However, such derivative works may not relicense, sublicense, or obscure the original Oxiverse Software's copyright notices, and any modification to the core Oxiverse Software must remain under OCL v1.0. "Core Oxiverse Software" means the Oxiverse cognitive architecture (including RAVANA, RLMv2, ConceptGraph, and successor components), IntentForge search engine, and any other Oxiverse services released under this License unless explicitly designated otherwise by Licensor.</p>
            <p><strong>Commercial use is prohibited except as expressly permitted under Section 3.</strong></p>
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
            <p><strong>Knowledge Exception:</strong> This License restricts the commercial distribution, hosting, or monetization of the Software itself. It does not restrict a developer's ability to use general knowledge, algorithms, ideas, or publicly documented concepts learned from reading or using the Software in wholly separate, unrelated commercial projects.</p>
          </section>

          <section className="mb-12">
            <h2>3. Commercial Use & Licensing</h2>
            <p>
              Commercial use of the Software is permitted under one of two paths:
            </p>
            <h3>(a) Open-Source Commercial License (Free)</h3>
            <p>
              You may use, modify, and monetize the Software for commercial purposes without paying a licensing fee, provided that:
            </p>
            <ul>
              <li>Your project and all derivative works are distributed under OCL v1.0 only;</li>
              <li>You make complete corresponding source code publicly available;</li>
              <li>You maintain all copyright notices and this License;</li>
              <li>You comply fully with Section 5 (Privacy-by-Design Requirement).</li>
            </ul>
            <p>This path is designed to reward builders who contribute back to the ecosystem.</p>
            <h3>(b) Proprietary Commercial License (Paid)</h3>
            <p>
              If you wish to develop, deploy, or monetize the Software without open-sourcing your derivative works, you must obtain a separate, written Commercial License from Licensor.
            </p>
            <p>To inquire about Proprietary Commercial Licensing, contact: <a href="mailto:likhith@oxiverse.com" className="text-accent-300 hover:text-primary-50 ml-1">likhith@oxiverse.com</a></p>
            <p>Proprietary Commercial Licenses may include terms for:</p>
            <ul>
              <li>Closed-source deployment in revenue-generating environments</li>
              <li>White-labeling or proprietary redistribution rights</li>
              <li>Support, updates, and SLA options</li>
              <li>Custom feature development or integration</li>
              <li>Multi-year licensing agreements with volume discounts</li>
            </ul>
            <h3>3.1 Verification & Compliance</h3>
            <p>
              If you claim eligibility for the Open-Source Commercial License under (a):
            </p>
            <ul>
              <li>You are responsible for maintaining public source code availability;</li>
              <li>Licensor reserves the right to verify compliance and request evidence of open-source distribution;</li>
              <li>Misrepresenting your project as open-source to avoid Commercial Licensing constitutes license violation and triggers Section 9 (Termination).</li>
            </ul>
            <h3>3.2 No Selective Open-Washing</h3>
            <p>Publishing only a frontend, UI layer, or non-functional wrapper under an open-source license while keeping the core engine, search index, ranking algorithms, cognitive architecture, or any revenue-generating component proprietary does <strong>not</strong> qualify as open-source distribution under this License. The complete corresponding source code for all functional components must be publicly available. Any attempt to circumvent this by architectural separation of "open" and "closed" modules triggers Section 9 (Termination).</p>
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
              <li>(b) <strong>Data Minimization</strong>: No telemetry, analytics, or user data may be collected except for crash logs and diagnostic data. Such logs must be stored locally by default. If the user chooses to transmit logs to a third-party service (including Oxiverse-operated services, or a self-hosted alternative), they must obtain explicit, informed, opt-in consent from the end-user. The Software must provide a clear mechanism to disable all log transmission entirely.</li>
              <li>(c) <strong>User Control</strong>: Users must retain the ability to view, export, and delete any data generated or stored by the Software.</li>
              <li>(d) <strong>Enhancements Encouraged</strong>: You are free—and encouraged—to enhance privacy protections beyond this baseline (e.g., end-to-end encryption, local-first architecture, zero-knowledge proofs).</li>
              <li>(e) <strong>Transparency & Mandatory Privacy Policy</strong>: Any entity distributing the Software or derivative works (commercial or non-commercial) must publish a human-readable privacy policy that: (i) discloses use of Oxiverse services; (ii) states that no user data is stored except crash logs, which may be transmitted (if the user opts in) to Oxiverse-operated services or a user-selected third-party alternative, and that transmission can be entirely disabled; (iii) is prominently linked in the Software and all distribution channels.</li>
            </ul>
            <p><strong>Violation of this Privacy Requirement constitutes a material breach of this License and triggers automatic termination under Section 9.</strong></p>
          </section>

          <section className="mb-12">
            <h2>6. Contributions</h2>
            <p>Any contribution submitted to Licensor for inclusion in the Software shall be governed by the terms of this License. By submitting a contribution, you represent that you have the right to do so, and you grant Licensor a perpetual, worldwide, non-exclusive, royalty-free license to distribute your contribution solely under the terms of OCL v1.0 (and any future versions of OCL that Licensor publishes).</p>
            <p><strong>Commercial Licensing Exception:</strong> If Licensor wishes to include your contribution in a Proprietary Commercial License (Section 3(b)), Licensor must obtain your separate, explicit written consent and negotiate fair compensation with you at that time.</p>
            <p><strong>Contributor Commercial Licensing Benefit:</strong> If you are a contributor to the Software and wish to obtain a Proprietary Commercial License (Section 3(b)) to commercialize derivative works based on your contribution, you are eligible for preferential licensing terms (discounted or waived fees) at Licensor's discretion, contingent on: (a) Your contribution being already merged into the core Software; (b) You operating a distinct, separate commercial service or product (not a direct fork of the Software); (c) Your application for commercial licensing explicitly referencing your contributor status and the specific contribution(s) involved.</p>
            <p>The core Oxiverse Software and its cognitive architecture (RAVANA, RLMv2, ConceptGraph, and successor components) remain under OCL v1.0 and may not be relicensed, sublicensed, or closed-sourced by any party, including contributors. Only derivative works and original extensions created on top of the core may be commercialized under proprietary terms, subject to a valid Proprietary Commercial License.</p>
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
              This License automatically terminates if you violate any of its terms and fail to cure the violation after written notice. Upon discovery of a violation, Licensor shall provide written notice to Licensee and a reasonable opportunity (minimum 30 days) to cure the violation. If not cured within this period, the License terminates automatically. Upon termination:
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
