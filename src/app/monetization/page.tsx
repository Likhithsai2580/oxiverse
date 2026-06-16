import React from 'react'
import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Section from '@/components/ui/Section'

export const metadata: Metadata = {
  title: 'Monetization & Sustainability | Oxiverse',
  description: 'How Oxiverse sustains itself without ads or tracking. Sovereign commerce affiliates, developer APIs, and commercial licensing — all privacy-preserving.',
  alternates: {
    canonical: '/monetization',
  },
}

export default function MonetizationPage() {
  return (
    <main className="min-h-screen bg-primary-800 retro-bg selection:bg-accent-300 selection:text-primary-950">
      <Navigation />
      <Section id="monetization" className="pt-32 pb-24 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block border-2 border-primary-50 px-3 py-1 mb-6 bg-primary-950">
              <span className="font-mono text-xs uppercase tracking-widest font-bold text-accent-300">Sustainability</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.9] text-primary-50 tracking-tighter font-bold uppercase mb-6">
              How We <span className="text-accent-300">Sustain.</span>
            </h1>
            <p className="text-lg text-primary-300 max-w-2xl mx-auto leading-relaxed border-l-4 border-primary-700 pl-6">
              No ads. No tracking. No data brokers. Oxiverse is funded by mechanisms that align with user privacy, not against it.
            </p>
          </div>

          {/* Core Principle */}
          <div className="retro-box-seafoam p-8 md:p-12 mb-16 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-950 mb-4 uppercase tracking-tight">
              Our North Star
            </h2>
            <p className="text-base md:text-lg text-primary-900 leading-relaxed font-medium">
              Every revenue mechanism must pass one test: <strong className="font-display">Does this preserve user privacy and autonomy?</strong> If the answer is no, we don't build it.
            </p>
          </div>

          {/* Revenue Pillars */}
          <div className="space-y-8 mb-16">
            <h2 className="text-[10px] font-mono font-bold text-accent-300 uppercase tracking-widest text-center mb-12">Revenue Pillars</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pillar 1: Sovereign Commerce Affiliates */}
              <div className="retro-box p-0 group">
                <div className="retro-header-bar">
                  <span>PILLAR_01</span>
                  <span className="text-[10px] font-mono text-primary-400 border border-primary-700 px-2 py-0.5 rounded">SOVEREIGN</span>
                </div>
                <div className="p-8 bg-primary-800 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-primary-900 border-2 border-primary-700 flex items-center justify-center text-2xl">
                      🛒
                    </div>
                    <h3 className="font-display text-xl font-bold text-primary-50 uppercase">Sovereign Commerce</h3>
                  </div>
                  <p className="text-primary-300 leading-relaxed text-sm mb-4 flex-1">
                    When users express purchase intent through search, we match them with relevant products from <strong>merchant-direct affiliate programs</strong> — no ad networks, no tracking pixels, no third-party cookies. The merchant pays a commission only when a sale occurs. Users stay anonymous; we never share PII.
                  </p>
                  <ul className="space-y-2 text-xs text-primary-400 font-mono">
                    <li className="flex items-center gap-2">✓ Merchant-direct relationships only</li>
                    <li className="flex items-center gap-2">✓ No ad exchanges or RTB</li>
                    <li className="flex items-center gap-2">✓ Zero user profiling</li>
                    <li className="flex items-center gap-2">✓ Transparent commission model</li>
                  </ul>
                </div>
              </div>

              {/* Pillar 2: Developer APIs */}
              <div className="retro-box p-0 group">
                <div className="retro-header-bar">
                  <span>PILLAR_02</span>
                  <span className="text-[10px] font-mono text-accent-300 border border-accent-300/30 px-2 py-0.5 rounded">PER-USE</span>
                </div>
                <div className="p-8 bg-primary-800 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-primary-900 border-2 border-primary-700 flex items-center justify-center text-2xl">
                      🔌
                    </div>
                    <h3 className="font-display text-xl font-bold text-primary-50 uppercase">Developer APIs</h3>
                  </div>
                  <p className="text-primary-300 leading-relaxed text-sm mb-4 flex-1">
                    Programmatic access to IntentForge's intent extraction, search, and ranking capabilities. Usage-based pricing — pay for what you consume. No monthly minimums, no lock-in. Build privacy-first search into your own products.
                  </p>
                  <ul className="space-y-2 text-xs text-primary-400 font-mono">
                    <li className="flex items-center gap-2">✓ Per-request or volume pricing</li>
                    <li className="flex items-center gap-2">✓ No data retention on our end</li>
                    <li className="flex items-center gap-2">✓ OpenAPI specs, SDKs</li>
                    <li className="flex items-center gap-2">✓ Self-serve dashboard</li>
                  </ul>
                </div>
              </div>

              {/* Pillar 3: Commercial Licensing */}
              <div className="retro-box p-0 group">
                <div className="retro-header-bar">
                  <span>PILLAR_03</span>
                  <span className="text-[10px] font-mono text-yellow-400 border border-yellow-400/30 px-2 py-0.5 rounded">ENTERPRISE</span>
                </div>
                <div className="p-8 bg-primary-800 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-primary-900 border-2 border-primary-700 flex items-center justify-center text-2xl">
                      📜
                    </div>
                    <h3 className="font-display text-xl font-bold text-primary-50 uppercase">Commercial Licensing</h3>
                  </div>
                  <p className="text-primary-300 leading-relaxed text-sm mb-4 flex-1">
                    Companies building proprietary products on Oxiverse tech can license under the Proprietary Commercial License (OCL v1.0 §3). Includes white-label rights, SLA, support, and custom integration. Revenue funds core R&D that benefits the entire ecosystem.
                  </p>
                  <ul className="space-y-2 text-xs text-primary-400 font-mono">
                    <li className="flex items-center gap-2">✓ Closed-source deployment rights</li>
                    <li className="flex items-center gap-2">✓ White-label & redistribution</li>
                    <li className="flex items-center gap-2">✓ SLA & priority support</li>
                    <li className="flex items-center gap-2">✓ Custom feature development</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* What We Don't Do */}
          <div className="retro-box p-0 mb-16">
            <div className="retro-header-bar">
              <span>EXCLUDED_MECHANISMS</span>
              <span className="text-[10px] font-mono text-red-400 border border-red-400/30 px-2 py-0.5 rounded">NEVER</span>
            </div>
            <div className="p-8 bg-primary-800">
              <h3 className="font-display text-xl font-bold text-primary-50 mb-6 uppercase tracking-tight flex items-center gap-3">
                <span className="text-red-400">✕</span>
                What We Will Never Do
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-primary-900/50 border border-primary-700">
                    <span className="text-red-400 text-xl">🚫</span>
                    <div>
                      <h4 className="font-bold text-primary-50 mb-1">Display Advertising</h4>
                      <p className="text-primary-300 text-sm">No banner ads, native ads, video ads, or any impression-based monetization. Ever.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-primary-900/50 border border-primary-700">
                    <span className="text-red-400 text-xl">🚫</span>
                    <div>
                      <h4 className="font-bold text-primary-50 mb-1">User Data Sales</h4>
                      <p className="text-primary-300 text-sm">No selling search history, click data, profiles, or inferred interests to third parties.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-primary-900/50 border border-primary-700">
                    <span className="text-red-400 text-xl">🚫</span>
                    <div>
                      <h4 className="font-bold text-primary-50 mb-1">Behavioral Targeting</h4>
                      <p className="text-primary-300 text-sm">No cross-site tracking, fingerprinting, or building advertising profiles of any kind.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-primary-900/50 border border-primary-700">
                    <span className="text-red-400 text-xl">🚫</span>
                    <div>
                      <h4 className="font-bold text-primary-50 mb-1">Surveillance Capitalism</h4>
                      <p className="text-primary-300 text-sm">No Google Analytics, Meta Pixel, or any third-party analytics that harvest user behavior.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-primary-900/50 border border-primary-700">
                    <span className="text-red-400 text-xl">🚫</span>
                    <div>
                      <h4 className="font-bold text-primary-50 mb-1">Search Manipulation</h4>
                      <p className="text-primary-300 text-sm">No paid placement, sponsored results masquerading as organic, or ranking for profit.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-primary-900/50 border border-primary-700">
                    <span className="text-red-400 text-xl">🚫</span>
                    <div>
                      <h4 className="font-bold text-primary-50 mb-1">Dark Patterns</h4>
                      <p className="text-primary-300 text-sm">No tricks to extract consent, no pre-checked boxes, no nag screens for monetization.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-primary-900/50 border border-primary-700">
                    <span className="text-red-400 text-xl">🚫</span>
                    <div>
                      <h4 className="font-bold text-primary-50 mb-1">Venture Capture</h4>
                      <p className="text-primary-300 text-sm">No investor pressure to pivot to surveillance. Oxiverse is founder-controlled.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-primary-900/50 border border-primary-700">
                    <span className="text-red-400 text-xl">🚫</span>
                    <div>
                      <h4 className="font-bold text-primary-50 mb-1">AI Training on User Data</h4>
                      <p className="text-primary-300 text-sm">No using queries or behavior to train models without explicit, revocable opt-in.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transparency */}
          <div className="retro-box p-0 mb-16">
            <div className="retro-header-bar">
              <span>TRANSPARENCY_REPORT</span>
            </div>
            <div className="p-8 bg-primary-800">
              <h3 className="font-display text-xl font-bold text-primary-50 mb-6 uppercase tracking-tight">Open Books, Open Source</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-accent-300 mb-3 uppercase tracking-wider font-mono text-sm">Financial Transparency</h4>
                  <ul className="space-y-2 text-primary-300 text-sm leading-relaxed">
                    <li className="flex items-center gap-2">• Quarterly sustainability reports published on <a href="/blog" className="text-accent-300 hover:underline">the blog</a></li>
                    <li className="flex items-center gap-2">• Revenue breakdown by pillar (affiliates / APIs / licensing)</li>
                    <li className="flex items-center gap-2">• Operating costs vs. revenue — no hidden burn</li>
                    <li className="flex items-center gap-2">• No VC equity → no exit pressure</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-accent-300 mb-3 uppercase tracking-wider font-mono text-sm">Technical Transparency</h4>
                  <ul className="space-y-2 text-primary-300 text-sm leading-relaxed">
                    <li className="flex items-center gap-2">• All code on <a href="https://codeberg.org/oxiverse" className="text-accent-300 hover:underline" target="_blank" rel="noopener noreferrer">Codeberg</a> (GitHub mirror)</li>
                    <li className="flex items-center gap-2">• Affiliate link logic auditable in source</li>
                    <li className="flex items-center gap-2">• API contracts versioned & documented</li>
                    <li className="flex items-center gap-2">• License terms in plain language (OCL v1.0)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="font-display text-3xl md:text-4xl text-primary-50 mb-4 uppercase tracking-tight">
              Build With Us
            </h2>
            <p className="text-primary-300 mb-8 max-w-xl mx-auto">
              Use the APIs. Contribute code. License commercially. Every path strengthens the privacy-first ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/docs/api" className="bg-accent-300 text-primary-950 font-bold text-xs uppercase tracking-widest py-3 px-8 hover:bg-accent-200 transition-colors">
                Explore APIs
              </a>
              <a href="/license" className="border-2 border-accent-300 text-accent-300 font-bold text-xs uppercase tracking-widest py-3 px-8 hover:bg-accent-950/30 transition-colors">
                Commercial License
              </a>
              <a href="/contributing" className="border-2 border-primary-50 text-primary-50 font-bold text-xs uppercase tracking-widest py-3 px-8 hover:bg-primary-950/50 transition-colors">
                Contribute
              </a>
            </div>
          </div>
        </div>
      </Section>
      <Footer />
    </main>
  )
}