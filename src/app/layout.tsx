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
      '@type': 'Organization',
      name: 'Oxiverse',
      url: 'https://oxiverse.com',
      logo: 'https://oxiverse.com/favicon-128x128.png',
      description: 'A privacy-first ecosystem specializing in intent-based discovery, search technology, and secure productivity tools.',
      founder: {
        '@type': 'Person',
        name: 'Likhith',
        url: 'https://codeberg.org/itxLikhith'
      },
      sameAs: [
        'https://codeberg.org/oxiverse',
        'https://github.com/oxiverse-ecosystem',
        'https://twitter.com/itxLikhith'
      ]
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
            text: 'Oxiverse is a privacy-first ecosystem of products including a search engine (IntentForge), browser, and productivity tools, all built on source-available principles and Privacy-by-Design.'
          }
        },
        {
          '@type': 'Question',
          name: 'Is Oxiverse open source?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, Oxiverse is source-available under the Oxiverse Community License (OCL) v1.0, ensuring transparency and privacy for all users.'
          }
        },
        {
          '@type': 'Question',
          name: 'Where is the official Oxiverse source code?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The primary development repository is hosted on Codeberg (codeberg.org/oxiverse). A mirror exists on GitHub (github.com/oxiverse-ecosystem), but all contributions should be directed to Codeberg to ensure development remains within privacy-focused infrastructure.'
          }
        },
        {
          '@type': 'Question',
          name: 'What is IntentForge?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'IntentForge is an autonomous discovery engine utilizing intent extraction and self-healing search technology to provide private, relevant results without user profiling or data retention.'
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
