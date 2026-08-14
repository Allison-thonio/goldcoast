import Link from 'next/link'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export const metadata = {
  title: 'Programmes | Goldcoast Foundation',
  description: 'Health, Education, and Youth Development programmes in the Niger Delta.',
}

const PROGRAMMES = [
  {
    slug: 'health',
    title: 'Community Health Outreach',
    description: 'Obstetric care, medical outreach, maternal health support, and epidemic prevention across rural Niger Delta communities.',
    icon: '01',
    badge: 'Healthcare',
  },
  {
    slug: 'education',
    title: 'Girl-Child Education & Literacy',
    description: 'Educational scholarships, school supply distribution, literacy initiatives, and protection programs for young girls.',
    icon: '02',
    badge: 'Education',
  },
  {
    slug: 'youth',
    title: 'Youth Empowerment & Skills',
    description: 'Vocational academies (fashion, tech, trades), talent spotlighting, entrepreneurship grants, and career mentorship.',
    icon: '03',
    badge: 'Youth & Trade',
  },
]

export default function Programmes() {
  return (
    <div className="bg-paper min-h-screen pt-24">
      {/* Hero */}
      <section className="bg-sand py-20 px-4 border-b border-sand-deep">
        <div className="container-goldcoast max-w-4xl text-left">
          <ScrollReveal>
            <span className="eyebrow text-mangrove bg-mangrove/10 mb-4 inline-block">
              Targeted Pillars of Service
            </span>
            <h1 className="font-serif font-bold text-ink text-4xl sm:text-5xl mb-6">
              Our Core Programmes
            </h1>
            <p className="text-mangrove text-lg sm:text-xl leading-relaxed max-w-2xl">
              Three integrated focus areas working in unison to build long-term resilience, health, and economic independence in Bayelsa and the Niger Delta.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Programmes Cards */}
      <section className="py-20 px-4">
        <div className="container-goldcoast">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROGRAMMES.map((prog, idx) => (
              <ScrollReveal key={prog.slug} delay={idx * 100}>
                <Link
                  href={`/programmes/${prog.slug}`}
                  className="group flex flex-col justify-between p-8 border border-sand-deep rounded-3xl bg-paper hover:bg-sand/30 hover:border-clay hover-lift transition-all duration-300 h-full shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-3xl font-bold text-clay-deep group-hover:scale-110 transition-transform">
                        {prog.icon}
                      </span>
                      <span className="text-[11px] font-mono font-semibold uppercase px-3 py-1 rounded-full bg-sand-deep text-mangrove">
                        {prog.badge}
                      </span>
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-ink mb-3 group-hover:text-clay-deep transition-colors">
                      {prog.title}
                    </h2>
                    <p className="text-mangrove text-sm leading-relaxed mb-8">{prog.description}</p>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-clay uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    <span>Explore Pillar</span>
                    <span>→</span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Integrated Approach */}
      <section className="bg-teal-ink text-paper py-20 px-4">
        <div className="container-goldcoast max-w-3xl">
          <ScrollReveal>
            <div className="text-left space-y-6">
              <span className="eyebrow text-sand bg-sand/10">Methodology</span>
              <h2 className="font-serif text-3xl font-bold text-sand">Our Integrated Development Framework</h2>
              <p className="text-paper/85 text-base leading-relaxed">
                Health, education, and economic opportunity cannot exist in isolation. Our model connects community healthcare with youth vocational training and educational scholarships for maximum community impact.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm font-mono text-paper/90">
                <div className="p-4 rounded-xl bg-ink/50 border border-sand/15 flex items-start gap-3">
                  <span className="text-clay">✓</span>
                  <span>Community-led priority setting</span>
                </div>
                <div className="p-4 rounded-xl bg-ink/50 border border-sand/15 flex items-start gap-3">
                  <span className="text-clay">✓</span>
                  <span>Government & NGO strategic alliances</span>
                </div>
                <div className="p-4 rounded-xl bg-ink/50 border border-sand/15 flex items-start gap-3">
                  <span className="text-clay">✓</span>
                  <span>Focus on underserved rural populations</span>
                </div>
                <div className="p-4 rounded-xl bg-ink/50 border border-sand/15 flex items-start gap-3">
                  <span className="text-clay">✓</span>
                  <span>Long-term sustainability & capacity</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
