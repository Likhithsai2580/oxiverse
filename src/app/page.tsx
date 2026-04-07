import lazyLoad from 'next/dynamic'
import Navigation from '@/components/Navigation'
import Hero from '@/app/(sections)/Hero'
import Features from '@/app/(sections)/Features'
import UseCases from '@/app/(sections)/UseCases'

// Dynamically import heavy sections
const SectionSkeleton = () => <div className="min-h-[400px] bg-primary-900/10 animate-pulse border-2 border-primary-50/5 mx-4 md:mx-8 mb-4" />

const Roadmap = lazyLoad(() => import('@/app/(sections)/Roadmap'), { loading: SectionSkeleton })
const Ecosystem = lazyLoad(() => import('@/app/(sections)/Ecosystem'), { loading: SectionSkeleton })
const Research = lazyLoad(() => import('@/app/(sections)/Research'), { loading: SectionSkeleton })
const Blog = lazyLoad(() => import('@/app/(sections)/Blog'), { loading: SectionSkeleton })
const About = lazyLoad(() => import('@/app/(sections)/About'), { loading: SectionSkeleton })
const Newsletter = lazyLoad(() => import('@/app/(sections)/Newsletter'), { loading: SectionSkeleton })
const Contact = lazyLoad(() => import('@/app/(sections)/Contact'), { loading: SectionSkeleton })
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
