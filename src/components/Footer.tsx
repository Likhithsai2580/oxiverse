'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const footerLinks = {
  products: [
    { name: 'Search Engine', href: 'https://codeberg.org/oxiverse/intentforge' },
    { name: 'Modern Browser (Soon)', href: '#' },
    { name: 'Secure Mail (Soon)', href: '#' },
    { name: 'GSuite Alt (Soon)', href: '#' },
    { name: 'Productivity Docs (Soon)', href: '#' },
    { name: 'Download Manager (Soon)', href: '#' },
  ],
  resources: [
    { name: 'Documentation', href: 'https://codeberg.org/oxiverse/intentforge/src/branch/main/docs' },
    { name: 'API Reference', href: 'https://codeberg.org/oxiverse/intentforge' },
    { name: 'Research Portal', href: '/research' },
    { name: 'Developer Blog', href: '/blog' },
    { name: 'Project Roadmap', href: '/#roadmap' },
  ],
  community: [
    { name: 'Codeberg Org', href: 'https://codeberg.org/oxiverse' },
    { name: 'Dev Discussions', href: 'https://codeberg.org/oxiverse/intentforge/discussions' },
    { name: 'Open Issues', href: 'https://codeberg.org/oxiverse/intentforge/issues/new' },
    { name: 'Contribution Guide', href: 'https://codeberg.org/oxiverse/intentforge/src/branch/main/CONTRIBUTING.md' },
  ],
  legal: [
    { name: 'Privacy Protocol', href: '/privacy' },
    { name: 'Network Terms', href: '/terms' },
    { name: 'IECL License', href: '/license' },
  ],
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary-950 border-t-2 border-primary-50 relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <div className="relative w-9 h-9">
                <Image src="/favicon-128x128.png" alt="Oxiverse Logo" fill sizes="36px" className="object-contain" />
              </div>
              <span className="text-lg font-bold font-display text-primary-50 uppercase">Oxiverse</span>
            </Link>
            <p className="text-primary-400 text-sm mb-6 max-w-xs leading-relaxed">
              Explore &bull; Connect &bull; Create<br />
              A privacy-first ecosystem built for everyone.
            </p>
            <a href="https://codeberg.org/itxLikhith" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-accent-300 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.996 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.084 18.257l2.124-7.854 2.124 7.854h-4.248zm6.541 0l-2.022-7.464 2.022-3.829 4.341 11.293h-4.341z" /></svg>
            </a>
          </div>

          {(['products', 'resources', 'community'] as const).map((section) => (
            <div key={section}>
              <h4 className="text-xs font-bold font-mono text-primary-50 uppercase tracking-widest mb-4">{section}</h4>
              <ul className="space-y-2">
                {footerLinks[section].map((link) => (
                  <li key={link.name}>
                    <a href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sm text-primary-400 hover:text-accent-300 transition-colors"
                    >{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t-2 border-primary-700 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-primary-500">
            <span>&copy; {currentYear} Oxiverse. Built by</span>
            <a href="https://codeberg.org/itxLikhith" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent-300 transition-colors">
              <Image src="https://avatars.githubusercontent.com/u/254577690?v=4" alt="Likhith" width={20} height={20} className="rounded-full" />
              <span>Likhith</span>
            </a>
          </div>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-xs text-primary-500 hover:text-primary-300 transition-colors uppercase tracking-wider font-mono">Privacy Protocol</Link>
            <Link href="/terms" className="text-xs text-primary-500 hover:text-primary-300 transition-colors uppercase tracking-wider font-mono">Network Terms</Link>
            <Link href="/license" className="text-xs text-primary-500 hover:text-primary-300 transition-colors uppercase tracking-wider font-mono">IECL License</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
