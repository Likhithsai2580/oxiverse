import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const footerLinks = {
  products: [
    { name: 'Search Engine', href: 'https://github.com/oxiverse-labs/intentforge' },
    { name: 'Modern Browser (Soon)', href: '#' },
    { name: 'Secure Mail (Soon)', href: '#' },
    { name: 'GSuite Alt (Soon)', href: '#' },
    { name: 'Productivity Docs (Soon)', href: '#' },
    { name: 'Download Manager (Soon)', href: '#' },
  ],
  resources: [
    { name: 'Documentation', href: 'https://github.com/oxiverse-labs/intentforge/tree/master/docs' },
    { name: 'API Reference', href: 'https://github.com/oxiverse-labs/intentforge' },
    { name: 'Research Portal', href: '/research' },
    { name: 'Developer Blog', href: '/blog' },
    { name: 'Project Roadmap', href: '/#roadmap' },
  ],
  community: [
    { name: 'GitHub Org', href: 'https://github.com/oxiverse-labs' },
    { name: 'Dev Discussions', href: 'https://github.com/oxiverse-labs/intentforge/discussions' },
    { name: 'Open Issues', href: 'https://github.com/oxiverse-labs/intentforge/issues/new' },
    { name: 'Contribution Guide', href: 'https://github.com/oxiverse-labs/intentforge/blob/master/CONTRIBUTING.md' },
  ],
  legal: [
    { name: 'Privacy Protocol', href: '/#research' },
    { name: 'Network Terms', href: 'https://github.com/oxiverse-labs/intentforge/blob/master/README.md' },
    { name: 'IECL License', href: 'https://github.com/oxiverse-labs/intentforge/blob/master/LICENSE' },
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
            <a href="https://github.com/itxLikhith" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-accent-300 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
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
            <a href="https://github.com/itxLikhith" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent-300 transition-colors">
              <Image src="https://avatars.githubusercontent.com/u/254577690?v=4" alt="Likhith" width={20} height={20} className="rounded-full" />
              <span>Likhith</span>
            </a>
          </div>
          <div className="flex space-x-6">
            {footerLinks.legal.map((link) => (
              <a key={link.name} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-xs text-primary-500 hover:text-primary-300 transition-colors uppercase tracking-wider font-mono"
              >{link.name}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
