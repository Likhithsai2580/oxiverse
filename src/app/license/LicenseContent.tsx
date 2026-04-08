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
            IECL <span className="text-accent-300 font-outline-2">License</span>
          </h1>
          <div className="h-2 w-24 bg-accent-300 shadow-retro-sm mb-8" />
          <p className="text-xl text-primary-300 font-mono leading-relaxed max-w-2xl border-l-4 border-primary-700 pl-6">
            Intent Engine Community License (IECL) v1.0. 
            Defining the boundaries of open research and commercial implementation.
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
              Intent Engine Community License (IECL) v1.0{"\n"}
              Copyright (c) 2026 Likhith Sai Seemala
            </pre>
          </div>

          <section className="mb-12">
            <h2>1. Grant of License</h2>
            <p>
              Subject to the terms of this License, Likhith Sai Seemala grants you a worldwide,
              non-exclusive, non-transferable, non-sublicensable license to:
            </p>
            <ul>
              <li>(a) use, copy, modify, and run the Software;</li>
              <li>(b) create derivative works of the Software;</li>
              <li>(c) share the Software and derivative works, for Non-Commercial Purposes only.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>2. Non-Commercial Use Definition</h2>
            <p>
              &ldquo;Non-Commercial Purpose&rdquo; means use that is:
            </p>
            <ul>
              <li>Personal</li>
              <li>Educational</li>
              <li>Academic research</li>
              <li>Internal evaluation</li>
              <li>Open research experimentation</li>
            </ul>
            <p>Non-Commercial Purpose expressly excludes:</p>
            <ul>
              <li>Selling the Software</li>
              <li>Offering the Software as a hosted service (SaaS)</li>
              <li>Integrating the Software into a paid product</li>
              <li>Commercial consulting or client work using the Software</li>
              <li>Any revenue-generating activity directly or indirectly using the Software</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>3. Commercial Use Restriction</h2>
            <p>
              Any use of the Software for Commercial Purposes requires a separate Commercial
              License agreement with Likhith Sai Seemala. To obtain a Commercial License, contact:
              <a href="mailto:anony45.omnipresent@proton.me" className="text-accent-300 hover:text-primary-50 ml-1">anony45.omnipresent@proton.me</a>
            </p>
          </section>

          <section className="mb-12">
            <h2>4. Redistribution Conditions</h2>
            <p>If you distribute the Software or derivative works:</p>
            <ul>
              <li>You must include this License in full.</li>
              <li>You may not remove copyright notices.</li>
              <li>You may not sublicense under different terms.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>5. No Warranty</h2>
            <p className="uppercase">
              THE SOFTWARE IS PROVIDED &ldquo;AS IS&rdquo;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
              IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
              FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
          </section>

          <section className="mb-12">
            <h2>6. Limitation of Liability</h2>
            <p className="uppercase">
              IN NO EVENT SHALL THE LICENSOR BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER
              LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
              OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
              THE SOFTWARE.
            </p>
          </section>

          <section className="mb-12">
            <h2>7. Termination</h2>
            <p>
              This License automatically terminates if you violate its terms. Upon termination,
              you must cease all use and distribution of the Software.
            </p>
          </section>

          <section className="mb-12">
            <h2>8. Governing Law</h2>
            <p>
              This License shall be governed by the laws of India.
            </p>
          </section>

          <div className="p-6 border-2 border-accent-300/30 bg-primary-900/50 mt-16 shadow-retro-md text-sm">
            <p className="m-0">
              Last Updated: April 2026<br/>
              For licensing inquiries: <a href="mailto:anony45.omnipresent@proton.me" className="text-accent-300 hover:text-primary-50">anony45.omnipresent@proton.me</a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
