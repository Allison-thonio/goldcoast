import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ScrollingAnimation } from '@/components/ui/scrolling-animation'

export const metadata = {
  title: 'About Goldcoast Foundation',
  description: 'Our mission, vision, leadership team, and partners.',
}

export default function About() {
  return (
    <div className="bg-paper min-h-screen">
      {/* Scrolling Animation Hero */}
      <ScrollingAnimation />

      {/* Founder & Mission */}
      <section className="py-20 px-4">
        <div className="container-goldcoast max-w-4xl">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-7 space-y-6">
                <span className="eyebrow text-clay-deep bg-sand mb-2">Our Founder</span>
                <h2 className="font-serif text-3xl font-bold text-ink">Moses Oruaze Dickson</h2>
                <p className="text-mangrove leading-relaxed text-base">
                  <strong>Moses Oruaze Dickson</strong>, Managing Solicitor at Triax Solicitors, founded Goldcoast Developmental Foundation in 2012 in honor and memory of Goldcoast Dickson.
                </p>
                <p className="text-mangrove leading-relaxed text-base">
                  What began as a personal tribute has grown into a comprehensive nonprofit organization serving thousands across healthcare outreach, girl-child education, flood relief, and youth empowerment in the Niger Delta.
                </p>
              </div>

              <div className="md:col-span-5">
                <div className="p-8 rounded-3xl bg-teal-ink text-paper border border-sand/15 shadow-2xl space-y-4">
                  <div className="font-mono text-xs text-sand uppercase tracking-wider">Mission Statement</div>
                  <blockquote className="font-serif text-lg italic text-paper/90 leading-snug">
                    "Service, carried on from one generation to the next."
                  </blockquote>
                  <div className="text-xs text-sand/70 pt-2 border-t border-sand/10 font-mono">
                    Goldcoast Dickson Legacy
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Vision */}
      <section className="bg-sand-deep/60 py-20 px-4">
        <div className="container-goldcoast max-w-4xl">
          <ScrollReveal>
            <div className="max-w-2xl space-y-4">
              <span className="eyebrow text-mangrove bg-sand mb-2">Our Vision</span>
              <h2 className="font-serif text-3xl font-bold text-ink">Sustainable Regional Transformation</h2>
              <p className="text-mangrove text-lg leading-relaxed">
                A Niger Delta community where every individual has access to quality healthcare, meaningful education, and opportunities to develop their potential.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4">
        <div className="container-goldcoast max-w-4xl">
          <ScrollReveal>
            <h2 className="font-serif text-3xl font-bold text-ink mb-12">Milestone Timeline</h2>
            <div className="space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-sand-deep">
              {[
                { year: '2012', event: 'Goldcoast Developmental Foundation established in Bayelsa, Nigeria.' },
                { year: '2013', event: 'CAC registration finalized as a formal nonprofit organization.' },
                { year: '2018', event: 'Deployed comprehensive flood relief response across 5 IDP camps.' },
                { year: '2022', event: 'Established 40-person emergency shelter; celebrated 10th anniversary.' },
                { year: '2024', event: 'Expanded Niger Delta Talent Spotlight and community vocational academies.' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 items-start relative z-10">
                  <div className="w-7 h-7 rounded-full bg-clay text-teal-ink flex items-center justify-center font-mono text-xs font-bold shadow-md shrink-0">
                    ✓
                  </div>
                  <div className="bg-sand/40 p-5 rounded-2xl border border-sand-deep w-full hover-lift">
                    <span className="font-mono text-xs font-bold text-clay-deep uppercase">{item.year}</span>
                    <p className="text-ink font-medium mt-1">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-sand py-20 px-4">
        <div className="container-goldcoast max-w-4xl">
          <ScrollReveal>
            <h2 className="font-serif text-3xl font-bold text-ink mb-12 text-center">Leadership Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { name: 'Moses O. Dickson', role: 'Founder & President' },
                { name: 'Izu Brenda', role: 'Coordinator' },
                { name: 'Blessing Akinsunmade', role: 'Acting Administrator' },
                { name: 'Geku Philemon', role: 'Account Officer' },
                { name: 'Grace Dickson', role: 'Programme Director, Health' },
                { name: 'Anita Dickson', role: 'Programme Director, Education' },
              ].map((person, idx) => (
                <div key={idx} className="p-6 bg-paper rounded-2xl border border-sand-deep text-center hover-lift shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-teal/10 text-teal font-serif font-bold text-lg flex items-center justify-center mx-auto mb-3">
                    {person.name.charAt(0)}
                  </div>
                  <h3 className="font-serif font-bold text-ink text-base mb-1">{person.name}</h3>
                  <p className="text-xs font-mono text-mangrove">{person.role}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 px-4">
        <div className="container-goldcoast max-w-4xl">
          <ScrollReveal>
            <h2 className="font-serif text-3xl font-bold text-ink mb-10 text-center">Our Trusted Partners</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-center">
              {[
                'Nigerian Navy',
                'Nigerian Air Force',
                'Nigerian Police',
                'Nigerian Red Cross',
                'FIDA Bayelsa',
                'Bayelsa State Government',
                'Solalina Studios',
                'TKM Fashion Academy',
                'Triax Solicitors',
                'Mercy Corps',
                'United Nations Agencies',
                'Local Community Groups',
              ].map((partner, idx) => (
                <div key={idx} className="p-4 bg-sand/50 rounded-xl border border-sand-deep text-xs font-mono text-mangrove font-semibold hover-lift">
                  {partner}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
