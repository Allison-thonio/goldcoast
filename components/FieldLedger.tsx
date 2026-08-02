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

  return (
    <section className="bg-teal text-paper py-20 px-4 relative overflow-hidden">
      {/* Background ambient glow effect */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-sand/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-goldcoast relative z-10">
        {/* Registry Header */}
        <div className="mb-16">
          <span className="inline-block font-mono text-xs text-sand uppercase tracking-widest px-3 py-1 bg-sand/10 rounded-full mb-3">
            Impact Registry
          </span>
          <h2 className="font-serif text-4xl font-bold mb-2">Field Ledger</h2>
          <p className="font-mono text-sm text-paper/80">
            Registry of service and impact across Niger Delta communities
          </p>
        </div>

        {/* Registry Entries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {entries.map((entry, idx) => (
            <div
              key={idx}
              className="group border-l-4 border-sand hover:border-paper pl-6 py-4 bg-teal/40 hover:bg-teal-ink/30 rounded-r-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              style={{
                animation: prefersReducedMotion
                  ? 'none'
                  : `slideInLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 * idx}s both`,
              }}
            >
              {/* Entry Number */}
              <div className="font-mono text-xs text-sand/80 group-hover:text-sand mb-3 transition-colors flex items-center justify-between">
                <span>ENTRY #{String(idx + 1).padStart(2, '0')}</span>
                <span className="w-2 h-2 rounded-full bg-sand/40 group-hover:bg-sand group-hover:scale-125 transition-all duration-300" />
              </div>

              {/* Value with CountUp Animation */}
              <div className="font-serif text-5xl md:text-6xl font-bold mb-2 text-sand group-hover:text-paper transition-colors">
                <CountUp value={entry.value} duration={1800} />
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

      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-24px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  )
}

