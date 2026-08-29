'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface FooterLink {
  name: string
  href: string
  status?: 'live' | 'dev'
}

const products: FooterLink[] = [
  { name: 'IntentForge Search', href: 'https://search.oxiverse.com', status: 'live' },
  { name: 'Oxiverse Browser', href: '#', status: 'dev' },
  { name: 'Secure Mail', href: '#', status: 'dev' },
  { name: 'Download Manager', href: '#', status: 'dev' },
  { name: 'Productivity Docs', href: '#', status: 'dev' },
]

const resources: FooterLink[] = [
  { name: 'Documentation', href: '/docs' },
  { name: 'API Reference', href: '/docs' },
  { name: 'Research Portal', href: '/research' },
  { name: 'Developer Blog', href: '/blog' },
  { name: 'Visual Gallery', href: '/gallery' },
  { name: 'Project Roadmap', href: '/#roadmap' },
  { name: 'System FAQ', href: '/faq' },
]

const community: FooterLink[] = [
  { name: 'Contributing Guide', href: '/contributing' },
  { name: 'GitHub Repositories', href: 'https://github.com/itxLikhith' },
  { name: 'Codeberg Issues', href: 'https://codeberg.org/oxiverse/intentforge/issues' },
  { name: 'Partnerships & Operators', href: '/cofounder' },
  { name: 'Operator Model', href: '/operator' },
  { name: 'Intern Model', href: '/intern' },
  { name: 'Revenue Protocol', href: '/revenue' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [modalOpen, setModalOpen] = useState<{ name: string; message: string } | null>(null)

  const handleProductClick = (link: FooterLink) => {
    if (link.status === 'dev') {
      setModalOpen({
        name: link.name,
        message: `${link.name} is currently in active development. Source code will be available on GitHub and Codeberg when ready. Stay tuned for release updates!`
      })
    } else {
      window.open(link.href, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <footer className="bg-primary-950 border-t-2 border-accent-300 relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <div className="relative w-9 h-9">
                <Image src="/oxiverse-logo.svg" alt="Oxiverse Logo" fill sizes="36px" className="object-contain" />
              </div>
              <Image src="/oxiverse-wordmark.svg" alt="Oxiverse" width={120} height={30} sizes="120px" className="h-6 md:h-7 w-auto object-contain" />
            </Link>
            <p className="text-primary-400 text-sm mb-6 max-w-xs leading-relaxed">
              Explore &bull; Connect &bull; Create<br />
              A privacy-first ecosystem built for everyone.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="https://github.com/itxLikhith"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-900 border border-primary-700 rounded text-primary-300 hover:text-accent-300 hover:border-accent-300 transition-colors"
                title="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </Link>
              <Link
                href="https://codeberg.org/itxLikhith"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-900 border border-primary-700 rounded text-primary-300 hover:text-accent-300 hover:border-accent-300 transition-colors"
                title="Codeberg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.996 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.084 18.257l2.124-7.854 2.124 7.854h-4.248zm6.541 0l-2.022-7.464 2.022-3.829 4.341 11.293h-4.341z" />
                </svg>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold font-mono text-primary-50 uppercase tracking-widest mb-4">Products</h4>
            <ul className="space-y-2">
              {products.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleProductClick(link)}
                    className="text-sm text-primary-400 hover:text-accent-300 transition-colors text-left"
                  >
                    {link.name}
                    {link.status === 'dev' && <span className="ml-2 text-[8px] font-mono border border-accent-300/30 bg-accent-950/30 text-accent-300 px-1.5 py-0.5 rounded uppercase tracking-tighter">Dev</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold font-mono text-primary-50 uppercase tracking-widest mb-4">Resources</h4>
            <ul className="space-y-2">
              {resources.map((link) => (
                <li key={link.name}>
                  <a href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-sm text-primary-400 hover:text-accent-300 transition-colors"
                  >{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold font-mono text-primary-50 uppercase tracking-widest mb-4">Community</h4>
            <ul className="space-y-2">
              {community.map((link) => (
                <li key={link.name}>
                  <a href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-sm text-primary-400 hover:text-accent-300 transition-colors"
                  >{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-primary-700 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-3 text-[9px] font-mono uppercase tracking-widest text-primary-500 mb-1.5">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-300 animate-pulse" />
                SYSTEM: ACTIVE
              </span>
              <span className="text-primary-800">•</span>
              <span>ENCLAVE_SHIELD: ON</span>
              <span className="text-primary-800">•</span>
              <span>LOC: IN</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-primary-500">
              <span>&copy; {currentYear} Oxiverse. Built by</span>
              <a href="https://github.com/itxLikhith" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent-300 transition-colors">
                <Image src="https://avatars.githubusercontent.com/u/254577690?v=4" alt="Likhith" width={20} height={20} className="rounded-full" />
                <span>Likhith</span>
              </a>
            </div>
            <p className="text-[10px] text-primary-600 font-mono uppercase tracking-tight">
              Contribute on <a href="https://github.com/itxLikhith" target="_blank" rel="noopener noreferrer" className="hover:text-accent-400 underline decoration-primary-700 underline-offset-2">GitHub</a> or <a href="https://codeberg.org/oxiverse" target="_blank" rel="noopener noreferrer" className="hover:text-accent-400 underline decoration-primary-700 underline-offset-2">Codeberg</a>.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 md:space-x-6">
            <Link href="/faq" className="text-xs text-primary-500 hover:text-accent-300 transition-colors uppercase tracking-wider font-mono">System FAQ</Link>
            <Link href="/privacy" className="text-xs text-primary-500 hover:text-accent-300 transition-colors uppercase tracking-wider font-mono">Privacy Protocol</Link>
            <Link href="/terms" className="text-xs text-primary-500 hover:text-accent-300 transition-colors uppercase tracking-wider font-mono">Network Terms</Link>
            <Link href="/license" className="text-xs text-primary-500 hover:text-accent-300 transition-colors uppercase tracking-wider font-mono">OCL License</Link>
          </div>
        </div>
      </div>

      {/* Dev Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-950/90 backdrop-blur-sm p-4">
          <div className="bg-primary-800 border-2 border-accent-300 max-w-md w-full p-6 relative">
            <button
              onClick={() => setModalOpen(null)}
              className="absolute top-3 right-3 text-primary-400 hover:text-accent-300 transition-colors text-xl leading-none"
              aria-label="Close"
            >
              ×
            </button>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-mono border border-accent-300/30 bg-accent-950/30 text-accent-300 px-2 py-0.5 rounded uppercase tracking-tighter">DEV</span>
              <h3 className="font-display text-lg text-primary-50 font-bold uppercase">{modalOpen.name}</h3>
            </div>
            <p className="text-primary-300 text-sm leading-relaxed mb-6">{modalOpen.message}</p>
            <button
              onClick={() => setModalOpen(null)}
              className="w-full bg-accent-300 text-primary-950 font-bold text-xs uppercase tracking-widest py-2 px-4 hover:bg-accent-200 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </footer>
  )
}
