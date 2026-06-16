import React from 'react'
import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Section from '@/components/ui/Section'

export const metadata: Metadata = {
  title: 'Contributing Guide | Oxiverse',
  description: 'How to contribute to Oxiverse — code, docs, research, design, and community. No CLA, no corporate capture, just open collaboration.',
  alternates: {
    canonical: '/contributing',
  },
}

export default function ContributingPage() {
  return (
    <main className="min-h-screen bg-primary-800 retro-bg selection:bg-accent-300 selection:text-primary-950">
      <Navigation />
      <Section id="contributing" className="pt-32 pb-24 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block border-2 border-primary-50 px-3 py-1 mb-6 bg-primary-950">
              <span className="font-mono text-xs uppercase tracking-widest font-bold text-accent-300">Community</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.9] text-primary-50 tracking-tighter font-bold uppercase mb-6">
              <span className="text-accent-300">Contribute</span> to Oxiverse
            </h1>
            <p className="text-lg text-primary-300 max-w-2xl mx-auto leading-relaxed border-l-4 border-primary-700 pl-6">
              No CLA. No corporate capture. Just developers, researchers, and privacy advocates building together on Codeberg.
            </p>
          </div>

          {/* Principles */}
          <div className="retro-box-seafoam p-8 md:p-12 mb-16 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-950 mb-4 uppercase tracking-tight">
              Our Principles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-8">
              <div className="p-4 bg-primary-800/50 border border-primary-700">
                <h3 className="font-display text-lg font-bold text-primary-50 mb-2 uppercase">No CLA</h3>
                <p className="text-primary-900 text-sm">Contributions stay under OCL v1.0. You keep copyright; we get a license. No rights grabs.</p>
              </div>
              <div className="p-4 bg-primary-800/50 border border-primary-700">
                <h3 className="font-display text-lg font-bold text-primary-50 mb-2 uppercase">Privacy First</h3>
                <p className="text-primary-900 text-sm">Every PR must pass the privacy test: no telemetry, no tracking, no data leaks.</p>
              </div>
              <div className="p-4 bg-primary-800/50 border border-primary-700">
                <h3 className="font-display text-lg font-bold text-primary-50 mb-2 uppercase">Merit Based</h3>
                <p className="text-primary-900 text-sm">Code speaks. No hierarchy, no gatekeeping. Good ideas win regardless of source.</p>
              </div>
            </div>
          </div>

          {/* Ways to Contribute */}
          <div className="space-y-8 mb-16">
            <h2 className="text-[10px] font-mono font-bold text-accent-300 uppercase tracking-widest text-center mb-12">Ways to Contribute</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Code */}
              <div className="retro-box p-0 group">
                <div className="retro-header-bar">
                  <span>CONTRIB_CODE</span>
                </div>
                <div className="p-8 bg-primary-800 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary-900 border-2 border-primary-700 flex items-center justify-center text-xl">💻</div>
                    <h3 className="font-display text-xl font-bold text-primary-50 uppercase">Code</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-primary-300 leading-relaxed flex-1">
                    <li>• Core search engine (IntentForge)</li>
                    <li>• Browser, mail, productivity apps</li>
                    <li>• API SDKs (TypeScript, Python, Rust)</li>
                    <li>• Performance & privacy audits</li>
                    <li>• Bug fixes & regression tests</li>
                  </ul>
                  <a href="https://codeberg.org/oxiverse/intentforge/issues" target="_blank" rel="noopener noreferrer" className="mt-6 text-xs font-bold font-mono text-primary-400 uppercase tracking-widest hover:text-accent-300 flex items-center gap-2">
                    Browse Issues →
                  </a>
                </div>
              </div>

              {/* Documentation */}
              <div className="retro-box p-0 group">
                <div className="retro-header-bar">
                  <span>CONTRIB_DOCS</span>
                </div>
                <div className="p-8 bg-primary-800 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary-900 border-2 border-primary-700 flex items-center justify-center text-xl">📚</div>
                    <h3 className="font-display text-xl font-bold text-primary-50 uppercase">Documentation</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-primary-300 leading-relaxed flex-1">
                    <li>• API reference & guides</li>
                    <li>• Architecture decision records</li>
                    <li>• Self-hosting tutorials</li>
                    <li>• Privacy implementation guides</li>
                    <li>• Translations (i18n)</li>
                  </ul>
                  <a href="https://codeberg.org/oxiverse/intentforge/src/branch/main/docs" target="_blank" rel="noopener noreferrer" className="mt-6 text-xs font-bold font-mono text-primary-400 uppercase tracking-widest hover:text-accent-300 flex items-center gap-2">
                    View Docs Repo →
                  </a>
                </div>
              </div>

              {/* Research */}
              <div className="retro-box p-0 group">
                <div className="retro-header-bar">
                  <span>CONTRIB_RESEARCH</span>
                </div>
                <div className="p-8 bg-primary-800 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary-900 border-2 border-primary-700 flex items-center justify-center text-xl">🔬</div>
                    <h3 className="font-display text-xl font-bold text-primary-50 uppercase">Research</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-primary-300 leading-relaxed flex-1">
                    <li>• Intent extraction papers</li>
                    <li>• Privacy-preserving ML</li>
                    <li>• Search quality evaluation</li>
                    <li>• Cognitive architecture studies</li>
                    <li>• Adversarial robustness</li>
                  </ul>
                  <a href="/research" className="mt-6 text-xs font-bold font-mono text-primary-400 uppercase tracking-widest hover:text-accent-300 flex items-center gap-2">
                    Research Portal →
                  </a>
                </div>
              </div>

              {/* Design & UX */}
              <div className="retro-box p-0 group">
                <div className="retro-header-bar">
                  <span>CONTRIB_DESIGN</span>
                </div>
                <div className="p-8 bg-primary-800 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary-900 border-2 border-primary-700 flex items-center justify-center text-xl">🎨</div>
                    <h3 className="font-display text-xl font-bold text-primary-50 uppercase">Design & UX</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-primary-300 leading-relaxed flex-1">
                    <li>• Privacy-first UI patterns</li>
                    <li>• Accessibility audits (WCAG)</li>
                    <li>• Dark/light theme systems</li>
                    <li>• Motion & interaction design</li>
                    <li>• Iconography & illustrations</li>
                  </ul>
                  <a href="https://codeberg.org/oxiverse" target="_blank" rel="noopener noreferrer" className="mt-6 text-xs font-bold font-mono text-primary-400 uppercase tracking-widest hover:text-accent-300 flex items-center gap-2">
                    Design Issues →
                  </a>
                </div>
              </div>

              {/* Community */}
              <div className="retro-box p-0 group">
                <div className="retro-header-bar">
                  <span>CONTRIB_COMMUNITY</span>
                </div>
                <div className="p-8 bg-primary-800 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary-900 border-2 border-primary-700 flex items-center justify-center text-xl">🤝</div>
                    <h3 className="font-display text-xl font-bold text-primary-50 uppercase">Community</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-primary-300 leading-relaxed flex-1">
                    <li>• Answer questions on issues</li>
                    <li>• Write blog posts / tutorials</li>
                    <li>• Organize local meetups</li>
                    <li>• Review PRs & test releases</li>
                    <li>• Report bugs with minimal repro</li>
                  </ul>
                  <a href="https://codeberg.org/oxiverse/intentforge/issues/new" target="_blank" rel="noopener noreferrer" className="mt-6 text-xs font-bold font-mono text-primary-400 uppercase tracking-widest hover:text-accent-300 flex items-center gap-2">
                    Start Discussion →
                  </a>
                </div>
              </div>

              {/* Security */}
              <div className="retro-box p-0 group">
                <div className="retro-header-bar">
                  <span>CONTRIB_SECURITY</span>
                </div>
                <div className="p-8 bg-primary-800 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary-900 border-2 border-primary-700 flex items-center justify-center text-xl">🛡️</div>
                    <h3 className="font-display text-xl font-bold text-primary-50 uppercase">Security</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-primary-300 leading-relaxed flex-1">
                    <li>• Responsible disclosure</li>
                    <li>• Penetration testing</li>
                    <li>• Dependency auditing</li>
                    <li>• Privacy threat modeling</li>
                    <li>• Crypto implementation review</li>
                  </ul>
                  <a href="mailto:security@oxiverse.com" className="mt-6 text-xs font-bold font-mono text-primary-400 uppercase tracking-widest hover:text-accent-300 flex items-center gap-2">
                    Report Vulnerability →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Getting Started */}
          <div className="retro-box p-0 mb-16">
            <div className="retro-header-bar">
              <span>QUICK_START</span>
            </div>
            <div className="p-8 bg-primary-800">
              <h3 className="font-display text-xl font-bold text-primary-50 mb-6 uppercase tracking-tight">First Contribution in 5 Minutes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-accent-300 mb-4 uppercase tracking-wider font-mono text-sm">Code Contributors</h4>
                  <ol className="space-y-3 text-primary-300 text-sm leading-relaxed">
                    <li className="flex gap-3"><span className="text-accent-300 font-mono">1.</span> Fork <a href="https://codeberg.org/oxiverse/intentforge" className="text-accent-300 hover:underline" target="_blank" rel="noopener noreferrer">intentforge</a> on Codeberg</li>
                    <li className="flex gap-3"><span className="text-accent-300 font-mono">2.</span> Pick a <code className="bg-primary-900 px-1.5 py-0.5 rounded text-primary-200 text-xs">good first issue</code> label</li>
                    <li className="flex gap-3"><span className="text-accent-300 font-mono">3.</span> <code className="bg-primary-900 px-1.5 py-0.5 rounded text-primary-200 text-xs">pnpm install && pnpm dev</code></li>
                    <li className="flex gap-3"><span className="text-accent-300 font-mono">4.</span> Write code + tests</li>
                    <li className="flex gap-3"><span className="text-accent-300 font-mono">5.</span> Open PR → Codeberg (not GitHub)</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-bold text-accent-300 mb-4 uppercase tracking-wider font-mono text-sm">Non-Code Contributors</h4>
                  <ol className="space-y-3 text-primary-300 text-sm leading-relaxed">
                    <li className="flex gap-3"><span className="text-accent-300 font-mono">1.</span> Join <a href="https://codeberg.org/oxiverse/intentforge/issues" className="text-accent-300 hover:underline" target="_blank" rel="noopener noreferrer">discussions</a> on Codeberg</li>
                    <li className="flex gap-3"><span className="text-accent-300 font-mono">2.</span> Read <a href="/docs" className="text-accent-300 hover:underline">docs</a> — find gaps</li>
                    <li className="flex gap-3"><span className="text-accent-300 font-mono">3.</span> Edit <code className="bg-primary-900 px-1.5 py-0.5 rounded text-primary-200 text-xs">.md</code> files directly in browser</li>
                    <li className="flex gap-3"><span className="text-accent-300 font-mono">4.</span> Submit PR with improvements</li>
                    <li className="flex gap-3"><span className="text-accent-300 font-mono">5.</span> Get merged → you're a contributor</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Development Standards */}
          <div className="retro-box p-0 mb-16">
            <div className="retro-header-bar">
              <span>STANDARDS</span>
            </div>
            <div className="p-8 bg-primary-800">
              <h3 className="font-display text-xl font-bold text-primary-50 mb-6 uppercase tracking-tight">Development Standards</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-bold text-accent-300 mb-3 uppercase tracking-wider font-mono text-sm">Code Quality</h4>
                  <ul className="space-y-2 text-primary-300 text-sm leading-relaxed">
                    <li>• TypeScript strict mode</li>
                    <li>• ESLint + Prettier (config in repo)</li>
                    <li>• 80%+ test coverage for new code</li>
                    <li>• No <code className="bg-primary-900 px-1.5 py-0.5 rounded text-primary-200 text-xs">any</code> without justification</li>
                    <li>• Conventional commits</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-accent-300 mb-3 uppercase tracking-wider font-mono text-sm">Privacy Requirements</h4>
                  <ul className="space-y-2 text-primary-300 text-sm leading-relaxed">
                    <li>• Zero telemetry by default</li>
                    <li>• Opt-in only for any data collection</li>
                    <li>• Local-first architecture preferred</li>
                    <li>• Encryption at rest & in transit</li>
                    <li>• Data deletion on account removal</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-accent-300 mb-3 uppercase tracking-wider font-mono text-sm">Review Process</h4>
                  <ul className="space-y-2 text-primary-300 text-sm leading-relaxed">
                    <li>• 2 approvals for core changes</li>
                    <li>• Security review for auth/crypto</li>
                    <li>• Privacy review for data handling</li>
                    <li>• Performance benchmarks for hot paths</li>
                    <li>• Docs updated with code</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Multi-Project Contribution Note */}
          <div className="retro-box p-0 mb-16">
            <div className="retro-header-bar">
              <span>MULTI_PROJECT</span>
            </div>
            <div className="p-8 bg-primary-800">
              <h3 className="font-display text-xl font-bold text-primary-50 mb-6 uppercase tracking-tight">Contributing Across Projects</h3>
              <p className="text-primary-300 mb-6">Oxiverse is a multi-repo ecosystem. Contribution processes are per-repository:</p>
              <div className="space-y-4 text-sm text-primary-300 leading-relaxed">
                <div className="p-4 bg-primary-900/50 border border-primary-700">
                  <h4 className="font-bold text-accent-300 mb-2">intentforge (core search)</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Intent extraction, ranking, meta-search, caching</li>
                    <li>Privacy-first search APIs, self-healing infrastructure</li>
                    <li>Codeberg: <a href="https://codeberg.org/oxiverse/intentforge" className="text-accent-300 hover:underline" target="_blank" rel="noopener noreferrer">codeberg.org/oxiverse/intentforge</a></li>
                    <li>Contributors: <a href="https://codeberg.org/oxiverse/intentforge/activity/contributors" className="text-accent-300 hover:underline" target="_blank" rel="noopener noreferrer">activity/contributors</a></li>
                  </ul>
                </div>
                <div className="p-4 bg-primary-900/50 border border-primary-700">
                  <h4 className="font-bold text-accent-300 mb-2">ravana (cognitive architecture)</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>GRACE 27-phase homeostatic core, BeliefStore, IdentityEngine</li>
                    <li>Decoder-first ML, continuous web training, emergent identity</li>
                    <li>Codeberg: <a href="https://codeberg.org/oxiverse/ravana" className="text-accent-300 hover:underline" target="_blank" rel="noopener noreferrer">codeberg.org/oxiverse/ravana</a></li>
                    <li>Contributors: <a href="https://codeberg.org/oxiverse/ravana/activity/contributors" className="text-accent-300 hover:underline" target="_blank" rel="noopener noreferrer">activity/contributors</a></li>
                  </ul>
                </div>
                <div className="p-4 bg-primary-900/50 border border-primary-700">
                  <h4 className="font-bold text-accent-300 mb-2">api (search & discovery APIs)</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Public REST/GraphQL APIs for IntentForge</li>
                    <li>Rate limiting, auth, usage analytics (privacy-safe)</li>
                    <li>Codeberg: <a href="https://codeberg.org/oxiverse/api" className="text-accent-300 hover:underline" target="_blank" rel="noopener noreferrer">codeberg.org/oxiverse/api</a></li>
                  </ul>
                </div>
              </div>
              <p className="text-primary-400 text-xs mt-6 font-mono uppercase tracking-wider">
                Always submit PRs to the correct repository. Issues without a repo reference will be closed with a redirect.
              </p>
            </div>
          </div>

          {/* Recognition - Generic */}
          <div className="retro-box p-0 mb-16">
            <div className="retro-header-bar">
              <span>RECOGNITION</span>
            </div>
            <div className="p-8 bg-primary-800 text-center">
              <h3 className="font-display text-xl font-bold text-primary-50 mb-4 uppercase tracking-tight">Contributors</h3>
              <p className="text-primary-300 mb-8 max-w-2xl mx-auto">
                We value every contribution — code, docs, research, design, community, security. 
                Contributor recognition lives in each project's repository on Codeberg.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://codeberg.org/oxiverse/intentforge/activity/contributors" target="_blank" rel="noopener noreferrer" className="border border-primary-700 text-primary-400 px-4 py-2 text-xs font-mono uppercase tracking-wider hover:border-accent-300 hover:text-accent-300 transition-colors">
                  intentforge contributors
                </a>
                <a href="https://codeberg.org/oxiverse/ravana/activity/contributors" target="_blank" rel="noopener noreferrer" className="border border-primary-700 text-primary-400 px-4 py-2 text-xs font-mono uppercase tracking-wider hover:border-accent-300 hover:text-accent-300 transition-colors">
                  ravana contributors
                </a>
                <a href="https://codeberg.org/oxiverse/api/activity/contributors" target="_blank" rel="noopener noreferrer" className="border border-primary-700 text-primary-400 px-4 py-2 text-xs font-mono uppercase tracking-wider hover:border-accent-300 hover:text-accent-300 transition-colors">
                  api contributors
                </a>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center">
            <h2 className="font-display text-3xl md:text-4xl text-primary-50 mb-4 uppercase tracking-tight">
              Questions?
            </h2>
            <p className="text-primary-300 mb-8 max-w-xl mx-auto">
              Open an issue, start a discussion, or email us. We'd rather over-communicate than leave you guessing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://codeberg.org/oxiverse/intentforge/issues/new" target="_blank" rel="noopener noreferrer" className="bg-accent-300 text-primary-950 font-bold text-xs uppercase tracking-widest py-3 px-8 hover:bg-accent-200 transition-colors">
                Open Issue
              </a>
              <a href="mailto:contrib@oxiverse.com" className="border-2 border-accent-300 text-accent-300 font-bold text-xs uppercase tracking-widest py-3 px-8 hover:bg-accent-950/30 transition-colors">
                Email Us
              </a>
            </div>
          </div>
        </div>
      </Section>
      <Footer />
    </main>
  )
}