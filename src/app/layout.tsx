import type { Metadata } from 'next'
import { Archivo, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import { ToastProvider } from '@/lib/providers/ToastProvider'
import { AuthProvider } from '@/lib/providers/AuthProvider'
import ScrollProgressBar from '@/components/ui/ScrollProgressBar'
import { SmoothScrollProvider } from '@/lib/providers/SmoothScrollProvider'
import { SpeedInsights } from '@vercel/speed-insights/next'

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-display',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://oxiverse.com'),
  title: {
    default: 'Oxiverse - Privacy-First Search & Developer Infrastructure',
    template: '%s | Oxiverse',
  },
  description: 'Oxiverse is an open-source ecosystem featuring IntentForge—an autonomous discovery engine. Built with Privacy-by-Design, it provides secure search, browser technology, and productivity tools without tracking.',
  keywords: [
    'Oxiverse', 'IntentForge', 'Privacy-First Search Engine', 'Autonomous Discovery Engine', 
    'Open Source Search', 'Intent Extraction', 'Self-Healing Search', 'Privacy-by-Design Infrastructure',
    'Codeberg Oxiverse', 'GitHub Oxiverse Mirror', 'Secure Productivity Suite'
  ],
  authors: [{ name: 'Likhith', url: 'https://codeberg.org/itxLikhith' }],
  publisher: 'Oxiverse',
  openGraph: {
    title: 'Oxiverse - Privacy-First Search & Developer Infrastructure',
    description: 'Autonomous discovery engine and privacy-first product ecosystem. Source available on Codeberg.',
    type: 'website',
    locale: 'en_US',
    url: 'https://oxiverse.com',
    siteName: 'Oxiverse',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oxiverse - Privacy-First Search & Developer Infrastructure',
    description: 'Decentralized, privacy-first ecosystem architected for builders. No tracking, no algorithmic bias.',
    creator: '@itxLikhith',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  category: 'technology',
  other: {
    'ai-content-readiness': 'high',
    'discovery-protocol': 'IntentForge v1.0',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://oxiverse.com/#person',
      name: 'Likhith',
      alternateName: 'Likhith Sai Seemala',
      givenName: 'Likhith',
      familyName: 'Seemala',
      image: 'https://avatars.githubusercontent.com/u/254577690?v=4',
      description: 'Founder of Oxiverse, a privacy-first open-source ecosystem. Developer building privacy-first alternatives to big tech.',
      url: 'https://oxiverse.com',
      sameAs: [
        'https://codeberg.org/itxLikhith',
        'https://github.com/itxLikhith',
        'https://twitter.com/itxLikhith',
        'https://instagram.com/itxLikhith',
        'https://reddit.com/user/itxLikhith',
        'https://t.me/itxLikhith',
        'https://cal.com/itxlikhith',
        'https://wikitia.com/wiki/Likhith_Sai_Seemala',
        'https://github.com/Likhithsai2580',
      ],
      jobTitle: 'Founder & Developer',
      worksFor: {
        '@type': 'Organization',
        name: 'Oxiverse',
        url: 'https://oxiverse.com',
      },
      knowsAbout: [
        'Privacy-by-Design',
        'Open Source Software',
        'Search Engine Technology',
        'Next.js',
        'TypeScript',
        'Software Architecture',
      ],
      email: 'likhith@oxiverse.com',
      nationality: { '@type': 'Country', name: 'India' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Oxiverse',
      url: 'https://oxiverse.com',
      logo: 'https://oxiverse.com/favicon-128x128.png',
      description: 'A privacy-first ecosystem specializing in intent-based discovery, search technology, and secure productivity tools.',
      founder: {
        '@type': 'Person',
        '@id': 'https://oxiverse.com/#person',
        name: 'Likhith',
        url: 'https://codeberg.org/itxLikhith'
      },
      sameAs: [
        'https://codeberg.org/oxiverse',
        'https://github.com/oxiverse-ecosystem',
        'https://twitter.com/itxLikhith',
        'https://instagram.com/itxLikhith',
      ],
      address: { '@type': 'PostalAddress', addressCountry: 'IN' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'IntentForge Search',
      applicationCategory: 'SearchEngine',
      operatingSystem: 'Web',
      url: 'https://search.oxiverse.com',
      description: 'An intent-first discovery engine focused on autonomous search and self-healing discovery technology.',
      softwareVersion: '1.0.0',
      license: 'https://oxiverse.com/license',
      author: {
        '@type': 'Person',
        name: 'Likhith'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareSourceCode',
      name: 'Oxiverse Ecosystem',
      description: 'Primary source code for the Oxiverse privacy-first ecosystem.',
      codeRepository: 'https://codeberg.org/oxiverse',
      runtimePlatform: 'Next.js, Node.js, PostgreSQL',
      programmingLanguage: 'TypeScript',
      license: 'https://oxiverse.com/license',
      maintainer: {
        '@type': 'Person',
        name: 'Likhith'
      },
      targetProduct: {
        '@type': 'SoftwareApplication',
        name: 'Oxiverse'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareSourceCode',
      name: 'Oxiverse GitHub Mirror',
      description: 'Official mirror repository for Oxiverse Ecosystem.',
      codeRepository: 'https://github.com/oxiverse-ecosystem',
      isBasedOn: 'https://codeberg.org/oxiverse',
      usageInfo: 'GitHub is a mirror. Please submit PRs and Issues via Codeberg.',
      maintainer: {
        '@type': 'Person',
        name: 'Likhith'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Oxiverse?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Oxiverse is a comprehensive, privacy-first ecosystem designed as a principled alternative to Big Tech platforms. We provide a suite of tools—including search, browser, email, docs, and cloud storage—built with zero tracking, full data sovereignty, and ethical design at the core.'
          }
        },
        {
          '@type': 'Question',
          name: 'How does your search engine protect my privacy?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'At our core is IntentForge, an autonomous discovery engine utilizing "self-healing" search technology to provide high-utility results, such as code snippets, without user profiling or ad-clutter. Your "intent" is served, but it is never stored.'
          }
        },
        {
          '@type': 'Question',
          name: 'What does "Open Source" mean for me as a user?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'All our applications operate under the Oxiverse Community License (OCL) v1.0. This ensures our tools remain transparent, auditable, and committed to your digital footprint, serving as a private, human-centric alternative to tracking-heavy infrastructure.'
          }
        },
        {
          '@type': 'Question',
          name: 'Are your services accessible to developers and researchers?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We cater to privacy-conscious developers and academic researchers who require a transparent, auditable tech stack—including Next.js, FastAPI, and Qdrant—without the interference of commercial data harvesting.'
          }
        },
        {
          '@type': 'Question',
          name: 'What are your operating hours?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'As a digital-first, 24-hour ecosystem, our infrastructure is always online, Sunday through Saturday. We are ready to serve you at any time of day.'
          }
        },
        {
          '@type': 'Question',
          name: 'How can I get in touch for support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can reach our team via SMS at +91 94914 84790. For immediate digital connection, you may also message us on WhatsApp at https://wa.me/919491484790.'
          }
        },
        {
          '@type': 'Question',
          name: 'Where is Oxiverse based?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Oxiverse is headquartered in India. While our origins lie in developer-focused projects hosted on Codeberg, we now operate as a global ecosystem dedicated to data autonomy.'
          }
        },
        {
          '@type': 'Question',
          name: 'Why should I switch from "Big Tech"?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We challenge the "normalization" of algorithmic bias and data retention as the price of admission for using the web. We empower you with "Enclave Security," ensuring your digital experience remains a safe haven that respects your data sovereignty.'
          }
        }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Oxiverse',
      url: 'https://oxiverse.com',
      description: 'An ecosystem of open-source products, developer documentation, and research publications.',
      about: [
        { '@type': 'Thing', name: 'Privacy-by-Design' },
        { '@type': 'Thing', name: 'Intent-Based Discovery' },
        { '@type': 'Thing', name: 'Open Source Software' },
        { '@type': 'Thing', name: 'Search Engine Technology' },
        { '@type': 'Thing', name: 'Data Autonomy' }
      ]
    }
  ]

  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-primary-800 retro-bg antialiased text-primary-50 selection:bg-accent-300 selection:text-primary-950">
        <noscript>
          <div id="content-fallback" style={{ padding: '20px', fontFamily: 'monospace' }}>
            <h1>Oxiverse</h1>
            <p>IntentForge — An intent-first discovery engine. Autonomous, self-healing search technology.</p>
            <p>A privacy-first ecosystem with search, browser, download manager, productivity suite, and more.</p>
            <a href="#platform">Platform</a> | <a href="#ecosystem">Ecosystem</a> | <a href="/blog">Blog</a>
          </div>
        </noscript>
        <ScrollProgressBar />
        <div className={`${archivo.className} ${plexMono.variable} relative z-10`}>
          <AuthProvider>
            <ToastProvider>
              <SmoothScrollProvider>
                {children}
              </SmoothScrollProvider>
            </ToastProvider>
          </AuthProvider>
        </div>
        <SpeedInsights />
      </body>
    </html>
  )
}
