import React from 'react'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import Image from 'next/image'

export default function About() {
  return (
    <Section id="about" className="pt-32 pb-24 bg-primary-800 relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        <div className="mb-16">
          <div className="inline-block border-2 border-primary-50 px-3 py-1 mb-6 bg-primary-950">
            <span className="font-mono text-xs uppercase tracking-widest font-bold text-accent-300">About</span>
          </div>
          <h2 className="font-display text-[3rem] md:text-[4.5rem] leading-[0.9] text-primary-50 tracking-tighter font-bold uppercase">
            Behind <span className="text-accent-300">Oxiverse.</span>
          </h2>
        </div>

        {/* Profile */}
        <div className="retro-box p-0 mb-8">
          <div className="retro-header-bar">
            <span>USER_PROFILE.DAT</span>
          </div>
          <div className="p-8 md:p-12 bg-primary-800 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-3 flex flex-col items-center md:items-start">
              <div className="relative w-28 h-28 overflow-hidden border-2 border-primary-50 mb-4">
                <Image src="https://avatars.githubusercontent.com/u/254577690?v=4" alt="Likhith" fill sizes="112px" className="object-cover" />
              </div>
              <h3 className="text-xl font-display text-primary-50 font-bold uppercase">Likhith</h3>
              <p className="text-xs uppercase tracking-widest text-primary-400 font-mono font-bold mt-1 mb-6">Founder &bull; Developer</p>
              <div className="flex gap-3">
                <Button href="https://github.com/oxiverse-labs" target="_blank" size="sm">GitHub</Button>
                <Button variant="outline" href="https://github.com/itxLikhith/intent-engine" target="_blank" size="sm">Source</Button>
              </div>
            </div>
            <div className="md:col-span-9">
              <div className="border-l-2 border-accent-300 pl-8">
                <p className="text-primary-200 leading-relaxed text-lg mb-4">
                  Oxiverse is the brainchild of Likhith, a passionate developer committed to creating privacy-first alternatives to big tech products.
                </p>
                <p className="text-primary-300 leading-relaxed">
                  Every line of code is written with the belief that technology should serve users, not exploit their data. Built on open source principles, transparent practices, and an unwavering commitment to privacy.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { value: '100%', label: 'Source Available' },
            { value: '0', label: 'User Tracking' },
            { value: '24/7', label: 'Privacy First' },
            { value: '\u221E', label: 'Possibilities' },
          ].map((stat) => (
            <div key={stat.label} className="retro-box p-0 group">
              <div className="p-6 bg-primary-800 text-center">
                <div className="text-3xl font-display text-primary-50 font-bold mb-1 group-hover:text-accent-300 transition-colors">{stat.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-primary-400 font-mono">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="retro-box-seafoam p-8 md:p-12 max-w-3xl mx-auto text-center">
          <blockquote className="text-lg md:text-xl font-display italic text-primary-950 leading-relaxed font-medium">
            &ldquo;Technology should empower users, not exploit them. Every feature in Oxiverse is built with one question in mind: Does this respect user privacy and autonomy?&rdquo;
          </blockquote>
          <cite className="block mt-4 text-primary-800 not-italic text-xs uppercase tracking-widest font-mono font-bold">
            &mdash; Likhith, Founder
          </cite>
        </div>
      </div>
    </Section>
  )
}
