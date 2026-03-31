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
  title: 'Oxiverse - Explore • Connect • Create',
  description: 'A privacy-first ecosystem with search, browser, download manager, productivity suite, and more. Built for developers, researchers, and privacy-conscious users.',
  keywords: ['search engine', 'privacy', 'open source', 'browser', 'productivity', 'developer tools'],
  authors: [{ name: 'Likhith', url: 'https://github.com/itxLikhith' }],
  openGraph: {
    title: 'Oxiverse - Explore • Connect • Create',
    description: 'A privacy-first ecosystem with search, browser, download manager, productivity suite, and more.',
    type: 'website',
    locale: 'en_US',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-dark-950 antialiased selection:bg-primary-500/30">
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
