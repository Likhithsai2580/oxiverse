import React from 'react'
import Section from '@/components/ui/Section'

const useCases = [
  { id: 'Dev', persona: 'Developers', description: 'Build better software with intent-aware search, programming error detection, and comprehensive documentation.', features: ['Error detection', 'API docs search', 'Code snippets', 'Community'] },
  { id: 'Res', persona: 'Researchers', description: 'Conduct thorough research with privacy-preserving search, academic resources, and data access.', features: ['Paper search', 'Citation tracking', 'Collaboration', 'Privacy guarantees'] },
  { id: 'Usr', persona: 'Privacy Users', description: 'Take back control of your digital life with tools that respect your privacy and ownership.', features: ['No tracking', 'Encrypted sync', 'Data ownership', 'GDPR compliance'] },
  { id: 'Edu', persona: 'Young Builders', description: 'Start your tech journey with accessible tools, learning resources, and community.', features: ['Learning resources', 'Open contributions', 'Mentorship', 'Portfolio building'] },
]

export default function UseCases() {
  return (
    <Section id="community" className="pt-32 pb-24 bg-primary-900 relative z-10">

      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
        <div className="inline-block border-2 border-primary-50 px-3 py-1 mb-6 bg-primary-950">
          <span className="font-mono text-xs uppercase tracking-widest font-bold text-accent-300">Use Cases</span>
        </div>
        <h2 className="font-display text-[3rem] md:text-[4.5rem] leading-[0.9] text-primary-50 tracking-tighter font-bold uppercase">
          Built for <span className="text-accent-300">Everyone.</span>
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {useCases.map((useCase) => (
            <div key={useCase.persona} className="retro-box p-0 group">
              <div className="retro-header-bar">
                <span>USER_PROFILE_{useCase.id}</span>
                <span className="font-mono text-xs">[{useCase.id}]</span>
              </div>
              <div className="p-8 bg-primary-800">
                <h3 className="text-2xl font-display text-primary-50 font-bold uppercase mb-4 group-hover:text-accent-300 transition-colors">
                  {useCase.persona}
                </h3>
                <p className="text-primary-300 mb-8 max-w-sm text-sm leading-relaxed">
                  {useCase.description}
                </p>
                <div className="pt-6 border-t-2 border-primary-700">
                  <ul className="grid grid-cols-2 gap-y-3 gap-x-2">
                    {useCase.features.map((feature) => (
                      <li key={feature} className="flex items-center text-xs font-mono text-primary-300 font-bold tracking-wide uppercase">
                        <span className="w-2 h-2 bg-accent-300 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
