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
    default: 'Oxiverse - Explore • Connect • Create',
    template: '%s | Oxiverse',
  },
  description: 'A privacy-first ecosystem with search, browser, download manager, productivity suite, and more. Built for developers, researchers, and privacy-conscious users.',
  keywords: ['search engine', 'privacy', 'open source', 'browser', 'productivity', 'developer tools', 'intent engine', 'intentforge'],
  authors: [{ name: 'Likhith', url: 'https://codeberg.org/itxLikhith' }],
  openGraph: {
    title: 'Oxiverse - Explore • Connect • Create',
    description: 'A privacy-first ecosystem with search, browser, download manager, productivity suite, and more.',
    type: 'website',
    locale: 'en_US',
    url: 'https://oxiverse.com',
    siteName: 'Oxiverse',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oxiverse - Explore • Connect • Create',
    description: 'A privacy-first ecosystem with search, browser, download manager, productivity suite, and more.',
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
  alternates: {
    canonical: '/',
  },
  category: 'technology',
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
      name: 'Likhith',
      url: 'https://oxiverse.com',
      jobTitle: 'Developer & Researcher',
      description: 'Portfolio of open-source repositories, technical blogs, and research papers on privacy-first infrastructure.',
      image: 'https://codeberg.org/itxLikhith.png',
      sameAs: [
        'https://codeberg.org/itxLikhith',
        'https://codeberg.org/oxiverse',
        'https://twitter.com/itxLikhith'
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Oxiverse',
      url: 'https://oxiverse.com',
      description: 'An ecosystem of open-source products, developer documentation, and research publications.'
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
