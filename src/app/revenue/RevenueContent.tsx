'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function RevenueContent() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const layers = [
    {
      id: 'LAYER_01',
      title: 'The Voting Layer',
      subtitle: 'Anti-Mob Floor',
      body: [
        'This layer ingests peer evaluations and enforces strict mathematical constraints to prevent manipulation and ensure fairness.',
      ],
      points: [
        'Every operator distributes exactly 100 points.',
        'Self-voting is strictly prohibited.',
        'Maximum 30 points may be given to any single peer.',
        'All 100 points must be allocated.',
      ],
      note: 'The Anti-Mob Floor (for n=5): if 4 operators coordinate a "mob attack" to starve a target of all points, they can only distribute 30 × 3 = 90 points to the 3 non-target peers. The remaining 10 points are mathematically forced onto the target. Across 4 attackers, the target is guaranteed a minimum of 40 points — preventing financial starvation before the revenue formula even executes.',
    },
    {
      id: 'LAYER_02',
      title: 'Adaptive Consensus Layer',
      subtitle: 'Dispersion & Easing',
      body: [
        'This layer measures the team\'s polarization and dynamically calculates the Base Ratio (b).',
        'Dispersion uses Mean Absolute Deviation (MAD) from the perfect consensus mean (100):',
      ],
      formula: 'MAD = (1/n) Σ |pᵢ − 100|',
      points: [
        'Normalize Variance: V = min(1.0, MAD / POLARIZATION_CAP) — a variance ratio between 0.0 and 1.0.',
        'Apply Quadratic Easing: b = B_min + ((B_max − B_min) × V²) — the base ratio stays stable at B_min until polarization becomes genuinely extreme.',
      ],
    },
    {
      id: 'LAYER_03',
      title: 'The Pool Allocation Layer',
      subtitle: 'Two Buckets',
      body: [
        'This layer slices the total Net Revenue Team Pool (R) into two distinct buckets based on the dynamic Base Ratio (b).',
      ],
      points: [
        'Base Pool (R_base): b × R — distributed equally to ensure income security.',
        'Performance Pool (R_perf): (1 − b) × R — distributed proportionally to reward merit.',
      ],
    },
    {
      id: 'LAYER_04',
      title: 'The Distribution Layer',
      subtitle: 'Final Payout',
      body: [
        'This layer calculates the final payout for each operator i:',
      ],
      formula: 'Payoutᵢ = (R_base / n) + (R_perf × pᵢ / 100n)',
      note: 'Invariant Check: the sum of all payouts always exactly equals R.',
    },
  ]

  const constants = [
    { param: 'POLARIZATION_CAP', value: '40', why: 'A cap of 10 over-reacts to normal variance. A cap of 40 keeps honest voting at a 52.1% base while smoothly raising the base to 57.2% during a verified Mob Attack.' },
    { param: 'B_min', value: '0.50', why: 'In a state of perfect consensus, 50% of the revenue is distributed equally as a guaranteed base distribution.' },
    { param: 'B_max', value: '0.70', why: 'Even in maximum polarization, 30% of the revenue remains in the Performance Pool to reward top contributors.' },
  ]

  const invariants = [
    'Total payout equals total revenue pool.',
    'Equal points produce equal payouts.',
    'More points can never produce less payout.',
    'Base ratio always satisfies: B_min ≤ b ≤ B_max.',
    'Every eligible operator receives at least their Base payout.',
    'Calculations are deterministic and publicly verifiable.',
  ]

  return (
    <div className="pt-16 pb-24 px-4 md:px-8 bg-transparent">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="mb-16"
        >
          <div className="inline-block border-2 border-primary-50 px-3 py-1 mb-6 bg-primary-950">
            <span className="font-mono text-xs uppercase tracking-widest font-bold text-accent-300">
              HOW IT WORKS · TECHNICAL SPECIFICATION v1.0
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black font-display text-primary-50 mb-6 uppercase tracking-tighter leading-[0.9]">
            Revenue <span className="text-accent-300 font-outline-2">Distribution</span> Protocol
          </h1>
          <div className="h-2 w-24 bg-accent-300 shadow-retro-sm mb-8" />
          <p className="text-xl text-primary-300 font-mono leading-relaxed max-w-3xl border-l-4 border-primary-700 pl-6 mb-6">
            The ORDP defines the deterministic mathematical implementation of the operator revenue split — 70% to the team, 30% to Oxiverse Systems LLP, computed on Net Revenue.
          </p>
          <p className="text-sm text-primary-400 font-mono leading-relaxed max-w-3xl border-l-4 border-primary-800 pl-6">
            The Operator model defines the principles of revenue sharing: guaranteed base pay, performance rewards, and equal treatment. This protocol defines the math. By separating the two, the protocol can be upgraded via governance without amending the foundational structure. Architecture: 4-layer modular design — adaptive consensus, anti-toxic governance, and perfect meritocratic correlation.
          </p>
        </motion.div>

        {/* Scope */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-16"
        >
          <section className="p-8 border-2 border-primary-700 bg-primary-900/30 rounded-lg shadow-retro-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 text-[10px] text-primary-500 font-mono">
              [ SCOPE ]
            </div>
            <h2 className="text-2xl font-bold uppercase tracking-widest text-accent-300 mb-4 border-b border-primary-700 pb-2">
              Scope
            </h2>
            <p className="text-primary-200 leading-relaxed text-sm">
              This protocol applies exclusively to the Oxiverse Operator Team consisting of <strong>2 to 5 Operators</strong>, as defined by the Oxiverse Constitution. It is not intended for larger teams without formal protocol revision.
            </p>
          </section>
        </motion.div>

        {/* Layers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="space-y-12 font-mono text-primary-100"
        >
          {layers.map((layer) => (
            <section
              key={layer.id}
              className="p-8 border-2 border-primary-700 bg-primary-900/30 rounded-lg shadow-retro-sm relative overflow-hidden group hover:border-accent-300/30 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 p-3 text-[10px] text-primary-500 font-mono">
                [ {layer.id} ]
              </div>
              <h2 className="text-2xl font-bold uppercase tracking-widest text-accent-300 mb-1 border-b border-primary-700 pb-2">
                {layer.title}
              </h2>
              <p className="text-xs text-primary-400 uppercase tracking-widest mb-4">
                {layer.subtitle}
              </p>
              <div className="space-y-3">
                {layer.body.map((para, i) => (
                  <p key={i} className="text-primary-200 leading-relaxed text-sm">
                    {para}
                  </p>
                ))}
              </div>
              {layer.formula && (
                <div className="my-4 p-4 bg-primary-950/70 border border-accent-300/30 rounded font-mono text-accent-300 text-sm md:text-base">
                  {layer.formula}
                </div>
              )}
              <ul className="space-y-2 text-sm text-primary-200">
                {layer.points?.map((point, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-accent-300 font-black">→</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              {layer.note && (
                <div className="mt-4 p-4 border border-primary-700 bg-primary-950/40 rounded">
                  <p className="text-primary-200 leading-relaxed text-sm">
                    {layer.note}
                  </p>
                </div>
              )}
            </section>
          ))}
        </motion.div>

        {/* Constants */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16"
        >
          <section className="p-8 border-2 border-primary-700 bg-primary-900/30 rounded-lg shadow-retro-sm">
            <div className="absolute top-0 right-0 p-3 text-[10px] text-primary-500 font-mono">
              [ CONSTANTS ]
            </div>
            <h2 className="text-2xl font-bold uppercase tracking-widest text-accent-300 mb-4 border-b border-primary-700 pb-2">
              Protocol Constants
            </h2>
            <p className="text-primary-200 leading-relaxed text-sm mb-6">
              These parameters were locked following a 750,000-iteration Monte Carlo stress test across 5 adversarial scenarios (Honest, Cartel, Mob Attack, Apathy, Superstar) and 5 team sizes.
            </p>
            <div className="space-y-4">
              {constants.map((c) => (
                <div key={c.param} className="p-4 bg-primary-950/40 border border-primary-700 rounded">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                    <span className="font-bold text-primary-50 text-sm">{c.param}</span>
                    <span className="text-accent-300 font-black text-xl">{c.value}</span>
                  </div>
                  <p className="text-primary-300 text-sm leading-relaxed">{c.why}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 border border-accent-300/30 bg-primary-950/40 rounded">
              <span className="block text-[10px] uppercase text-accent-300 font-bold tracking-widest mb-2">Simulation Proof of Meritocracy</span>
              <p className="text-primary-200 leading-relaxed text-sm">
                Across all 5 scenarios, the Point-to-Payout Correlation remained exactly <strong>1.0000</strong>. The protocol perfectly rewards merit without mathematical distortion. In a Mob Attack (n=5), the target receives ~74% of the top earner's payout (financially secure), while top earners still receive a <strong>1.43x multiplier</strong> (merit rewarded).
              </p>
            </div>
          </section>
        </motion.div>

        {/* Implementation Notes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-12"
        >
          <section className="p-8 border-2 border-primary-700 bg-primary-900/30 rounded-lg shadow-retro-sm">
            <h2 className="text-2xl font-bold uppercase tracking-widest text-accent-300 mb-4 border-b border-primary-700 pb-2">
              Implementation Notes
            </h2>
            <ul className="space-y-3 text-sm text-primary-200">
              <li className="flex gap-3"><span className="text-accent-300 font-black">→</span><span><strong>Gas Efficiency:</strong> MAD and Quadratic Easing require only basic arithmetic. No square roots or complex floating-point math.</span></li>
              <li className="flex gap-3"><span className="text-accent-300 font-black">→</span><span><strong>Precision:</strong> All internal calculations should use fixed-point math (e.g., multiplying by 10¹⁸ in Solidity) to prevent rounding errors before the final payout distribution.</span></li>
              <li className="flex gap-3"><span className="text-accent-300 font-black">→</span><span><strong>Integer Rounding:</strong> Any remainder produced by integer division is distributed per deterministic rules so total distributed revenue equals R exactly, no operator receives negative adjustment, and every execution produces identical results.</span></li>
              <li className="flex gap-3"><span className="text-accent-300 font-black">→</span><span><strong>Modularity:</strong> The 4 layers should be implemented as separate interfaces/contracts to allow future upgrades to the Consensus Layer without altering the Voting or Distribution logic. The protocol MUST remain deterministic — identical inputs always produce identical outputs regardless of language or environment.</span></li>
            </ul>
          </section>
        </motion.div>

        {/* Invariants */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12"
        >
          <section className="p-8 border-2 border-accent-300/30 bg-primary-900/50 rounded-lg shadow-retro-md">
            <h3 className="text-xl font-bold text-primary-50 uppercase mb-4 tracking-wider">
              Protocol Invariants
            </h3>
            <ul className="space-y-2 text-sm text-primary-200">
              {invariants.map((inv, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-accent-300 font-black">✓</span>
                  <span>{inv}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-primary-700 flex flex-col sm:flex-row gap-4">
              <a
                href="/operator"
                className="inline-block px-6 py-3 bg-accent-500 text-primary-900 font-bold uppercase tracking-wider text-sm hover:bg-accent-400 transition-all text-center shadow-retro-sm"
              >
                Operator Model
              </a>
              <a
                href="/cofounder"
                className="inline-block px-6 py-3 border-2 border-primary-500 text-primary-200 font-bold uppercase tracking-wider text-sm hover:border-accent-300 hover:text-accent-300 transition-all text-center"
              >
                Project Strategy
              </a>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  )
}