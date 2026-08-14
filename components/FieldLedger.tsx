'use client'

import { useEffect, useState } from 'react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { CountUp } from '@/components/ui/CountUp'

interface FieldLedgerProps {
  programmeId?: string
}

export default function FieldLedger({ programmeId }: FieldLedgerProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const aggregates = useQuery(api.donations.getDonationAggregates, {
    programmeId: programmeId ? (programmeId as any) : undefined,
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
  }, [])

  const entries = [
    { label: 'Years Running', value: '14', note: 'Est. 2012' },
    { label: 'Persons Trained', value: '100+', note: 'Across all programmes' },
    { label: 'Shelter Capacity', value: '40', note: 'Emergency response' },
    { label: 'Major Responses', value: '3', note: 'Flood relief interventions' },
  ]

  // 3+1 layout: first entry is featured (full-width), remaining 3 form the grid
  const featured = entries[0]
  const gridEntries = entries.slice(1)

  return (
    <section className="bg-teal text-paper py-20 px-4 relative overflow-hidden">
      {/* ─── Atmospheric glow shapes (warm ocher depth) ─── */}
      <div className="glow-shape glow-shape--strong -top-24 -right-24 w-96 h-96" />
      <div className="glow-shape -bottom-16 -left-16 w-80 h-80" />

      <div className="container-goldcoast relative z-10">
        {/* ─── Section anatomy: eyebrow → heading → copy ─── */}
        <div className="mb-16">
          <span className="eyebrow text-sand bg-sand/10 mb-3">
            Impact Registry
          </span>
          <h2
            className="font-serif font-bold mb-2"
            style={{ fontSize: 'var(--text-section)' }}
          >
            Field Ledger
          </h2>
          <p className="font-mono text-sm text-paper/80">
            Registry of service and impact across Niger Delta communities
          </p>
        </div>

        {/* ─── Featured stat (3+1 pattern: 1 dominant, 3 supporting) ─── */}
        <div
          className="group border-l-4 border-clay hover:border-paper pl-8 py-6 bg-teal-ink/20 hover:bg-teal-ink/30 rounded-r-lg mb-8"
          style={{
            animation: prefersReducedMotion
              ? 'none'
              : `slideInLeft var(--duration-reveal) var(--ease-settle) both`,
            transition: `background-color var(--duration-hover) var(--ease-settle), border-color var(--duration-hover) var(--ease-settle)`,
          }}
        >
          <div className="font-mono text-xs text-sand/80 group-hover:text-sand mb-3 flex items-center justify-between"
            style={{ transition: `color var(--duration-hover) var(--ease-settle)` }}
          >
            <span>ENTRY #01</span>
            <span
              className="w-2.5 h-2.5 rounded-full bg-clay group-hover:bg-sand"
              style={{ transition: `all var(--duration-hover) var(--ease-settle)` }}
            />
          </div>
          {/* Featured numeral — uses --text-stat at hero-adjacent scale */}
          <div
            className="font-serif font-bold mb-2 text-sand group-hover:text-paper tabular-nums"
            style={{
              fontSize: 'var(--text-hero)',
              transition: `color var(--duration-hover) var(--ease-settle)`,
            }}
          >
            <CountUp value={featured.value} />
          </div>
          <h3 className="font-mono text-sm font-semibold mb-1 text-paper">
            {featured.label}
          </h3>
          <p className="font-mono text-xs text-paper/70">{featured.note}</p>
        </div>

        {/* ─── 3-up grid (spec: consistently 3-up on desktop) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gridEntries.map((entry, idx) => (
            <div
              key={idx}
              className="group border-l-4 border-sand hover:border-paper pl-6 py-4 bg-teal/40 hover:bg-teal-ink/30 rounded-r-lg hover-lift"
              style={{
                animation: prefersReducedMotion
                  ? 'none'
                  : `slideInLeft var(--duration-reveal) var(--ease-settle) ${0.1 * (idx + 1)}s both`,
                transition: `background-color var(--duration-hover) var(--ease-settle), border-color var(--duration-hover) var(--ease-settle)`,
              }}
            >
              {/* Entry Number */}
              <div
                className="font-mono text-xs text-sand/80 group-hover:text-sand mb-3 flex items-center justify-between"
                style={{ transition: `color var(--duration-hover) var(--ease-settle)` }}
              >
                <span>ENTRY #{String(idx + 2).padStart(2, '0')}</span>
                <span
                  className="w-2 h-2 rounded-full bg-sand/40 group-hover:bg-sand"
                  style={{ transition: `all var(--duration-hover) var(--ease-settle)` }}
                />
              </div>

              {/* Stat numeral — uses --text-stat (same size class as section heading) */}
              <div
                className="font-serif font-bold mb-2 text-sand group-hover:text-paper tabular-nums"
                style={{
                  fontSize: 'var(--text-stat)',
                  transition: `color var(--duration-hover) var(--ease-settle)`,
                }}
              >
                <CountUp value={entry.value} />
              </div>

              {/* Label */}
              <h3 className="font-mono text-sm font-semibold mb-2 text-paper">
                {entry.label}
              </h3>

              {/* Note */}
              <p className="font-mono text-xs text-paper/70">{entry.note}</p>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-8 border-t border-sand/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-mono text-xs text-paper/60">
            Data aggregated from field reports and programme records. Updates quarterly.
          </p>
          <div className="inline-flex items-center gap-2 font-mono text-xs text-sand/90 bg-sand/10 px-3 py-1.5 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sand opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sand"></span>
            </span>
            Live Impact Tracking Active
          </div>
        </div>
      </div>
    </section>
  )
}
