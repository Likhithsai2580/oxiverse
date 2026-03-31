import lazyLoad from 'next/dynamic'
import Navigation from '@/components/Navigation'
import Hero from '@/app/(sections)/Hero'
import Features from '@/app/(sections)/Features'
import UseCases from '@/app/(sections)/UseCases'

// Dynamically import heavy sections
const Roadmap = lazyLoad(() => import('@/app/(sections)/Roadmap'))
const Ecosystem = lazyLoad(() => import('@/app/(sections)/Ecosystem'))
const Research = lazyLoad(() => import('@/app/(sections)/Research'))
const Blog = lazyLoad(() => import('@/app/(sections)/Blog'))
const About = lazyLoad(() => import('@/app/(sections)/About'))
const Newsletter = lazyLoad(() => import('@/app/(sections)/Newsletter'))
const Contact = lazyLoad(() => import('@/app/(sections)/Contact'))
import Footer from '@/components/Footer'

export const revalidate = 3600 // Revalidate every hour

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent">
      <Navigation />
      <Hero />
      <Features />
      <UseCases />
      <Roadmap />
      <Ecosystem />
      <Research />
      <Blog />
      <About />
      <Newsletter />
      <Contact />
      <Footer />
    </main>
  )
}
