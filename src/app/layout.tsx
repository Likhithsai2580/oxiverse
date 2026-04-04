import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { ToastProvider } from '@/lib/providers/ToastProvider'
import { AuthProvider } from '@/lib/providers/AuthProvider'
import ScrollProgressBar from '@/components/ui/ScrollProgressBar'
import { SmoothScrollProvider } from '@/lib/providers/SmoothScrollProvider'
import { Background3DProvider } from '@/components/3d/Background3DProvider'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://oxiverse.com'),
  title: {
    default: 'Oxiverse - Explore • Connect • Create',
    template: '%s | Oxiverse',
  },
  description: 'A privacy-first ecosystem with search, browser, download manager, productivity suite, and more. Built for developers, researchers, and privacy-conscious users.',
  keywords: ['search engine', 'privacy', 'open source', 'browser', 'productivity', 'developer tools', 'intent engine', 'intentforge'],
  authors: [{ name: 'Likhith', url: 'https://github.com/itxLikhith' }],
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
  verification: {
    google: 'google-site-verification-placeholder',
    yandex: 'yandex-verification-placeholder',
  },
  alternates: {
    canonical: 'https://oxiverse.com',
    languages: {
      'en-US': 'https://oxiverse.com',
    },
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
      image: 'https://github.com/itxLikhith.png',
      sameAs: [
        'https://github.com/itxLikhith',
        'https://github.com/oxiverse-labs',
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
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-dark-950 antialiased selection:bg-primary-500/30">
        <noscript>
          <div id="content-fallback" style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>Oxiverse</h1>
            <p>IntentForge — An intent-first discovery engine. Autonomous, self-healing search technology.</p>
            <p>A privacy-first ecosystem with search, browser, download manager, productivity suite, and more.</p>
            <a href="#platform">Platform</a> | <a href="#ecosystem">Ecosystem</a> | <a href="/blog">Blog</a>
          </div>
        </noscript>
        <ScrollProgressBar />
        <div className={`${inter.className} ${spaceGrotesk.variable}`}>
          <AuthProvider>
            <ToastProvider>
              <SmoothScrollProvider>
                <Background3DProvider>
                  {children}
                </Background3DProvider>
              </SmoothScrollProvider>
            </ToastProvider>
          </AuthProvider>
        </div>
        <SpeedInsights />
      </body>
    </html>
  )
}
