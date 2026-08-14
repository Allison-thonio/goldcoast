'use client'

import { useEffect, useState } from 'react'

const PILLARS = [
  'COMMUNITY HEALTH OUTREACH',
  'OBSTETRIC CARE & MATERNAL HEALTH',
  'EDUCATIONAL GRANTS',
  'PROTECT THE GIRL CHILD',
  'NIGER DELTA TALENT SPOTLIGHT',
  'SKILLS ACQUISITION & FASHION ACADEMY',
  'EMERGENCY FLOOD RELIEF SHELTER',
]

const PARTNERS = [
  'NIGERIAN RED CROSS',
  'FIDA BAYELSA',
  'TRIAX SOLICITORS',
  'TKM FASHION ACADEMY',
  'SOLALINA STUDIOS',
  'MERCY CORPS',
  'BAYELSA STATE GOVERNMENT',
]

export function MarqueeStrip() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReducedMotion(mediaQuery.matches)
    }
  }, [])

  if (prefersReducedMotion) return null

  return (
    <div className="w-full bg-sand-deep/60 py-4 border-y border-sand-deep overflow-hidden select-none">
      {/* Row 1: Pillars moving Left */}
      <div className="relative flex w-full overflow-hidden mb-3">
        <div className="flex animate-marquee-left whitespace-nowrap">
          {[...PILLARS, ...PILLARS].map((item, idx) => (
            <div
              key={`p1-${idx}`}
              className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-ink px-4 py-1.5 mx-2 bg-paper/80 rounded-full border border-sand-deep shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-clay" />
              {item}
            </div>
          ))}
        </div>
        <div className="flex animate-marquee-left whitespace-nowrap absolute top-0 left-full">
          {[...PILLARS, ...PILLARS].map((item, idx) => (
            <div
              key={`p2-${idx}`}
              className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-ink px-4 py-1.5 mx-2 bg-paper/80 rounded-full border border-sand-deep shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-clay" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Partners moving Right */}
      <div className="relative flex w-full overflow-hidden">
        <div className="flex animate-marquee-right whitespace-nowrap">
          {[...PARTNERS, ...PARTNERS].map((item, idx) => (
            <div
              key={`pt1-${idx}`}
              className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-teal px-4 py-1.5 mx-2 bg-paper/80 rounded-full border border-sand-deep shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-teal" />
              {item}
            </div>
          ))}
        </div>
        <div className="flex animate-marquee-right whitespace-nowrap absolute top-0 right-full">
          {[...PARTNERS, ...PARTNERS].map((item, idx) => (
            <div
              key={`pt2-${idx}`}
              className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-teal px-4 py-1.5 mx-2 bg-paper/80 rounded-full border border-sand-deep shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-teal" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MarqueeStrip
