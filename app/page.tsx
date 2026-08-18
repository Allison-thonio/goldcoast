import Hero from '@/components/Hero'
import FieldLedger from '@/components/FieldLedger'
import ProgrammeCarousel from '@/components/ProgrammeCarousel'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Hero Section */}
      <Hero />

      {/* Replaced Marquee: High-Impact Key Metrics & Mission Section */}
      <section className="py-16 px-4 bg-sand border-y border-sand-deep/60">
        <div className="container-goldcoast">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-6 bg-paper/80 rounded-2xl border border-sand-deep shadow-sm hover-lift">
                <div className="font-serif text-3xl sm:text-4xl font-bold text-teal mb-1">50,000+</div>
                <div className="font-mono text-xs text-mangrove uppercase tracking-wider">Lives Impacted</div>
              </div>
              <div className="p-6 bg-paper/80 rounded-2xl border border-sand-deep shadow-sm hover-lift">
                <div className="font-serif text-3xl sm:text-4xl font-bold text-clay-deep mb-1">40+</div>
                <div className="font-mono text-xs text-mangrove uppercase tracking-wider">Shelters Built</div>
              </div>
              <div className="p-6 bg-paper/80 rounded-2xl border border-sand-deep shadow-sm hover-lift">
                <div className="font-serif text-3xl sm:text-4xl font-bold text-teal mb-1">12+</div>
                <div className="font-mono text-xs text-mangrove uppercase tracking-wider">Active Programs</div>
              </div>
              <div className="p-6 bg-paper/80 rounded-2xl border border-sand-deep shadow-sm hover-lift">
                <div className="font-serif text-3xl sm:text-4xl font-bold text-clay-deep mb-1">100%</div>
                <div className="font-mono text-xs text-mangrove uppercase tracking-wider">Direct Field Operations</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Founder's Journey Section */}
      <section className="py-24 px-4 bg-teal-ink text-paper overflow-hidden relative">
        <div className="container-goldcoast relative z-10">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <span className="eyebrow text-sand bg-sand/10">
                  Humanity First
                </span>
                <h2
                  className="font-serif font-bold text-sand leading-tight"
                  style={{ fontSize: 'var(--text-section)' }}
                >
                  The Journey So Far
                </h2>
                <p className="text-paper/80 leading-relaxed" style={{ fontSize: 'var(--text-body-lg)' }}>
                  From coastal communities in the Niger Delta to international partners worldwide, our initiatives bridge local impact with global support networks, touching thousands of lives along the way.
                </p>
                <div className="pt-4 flex flex-wrap gap-4">
                  <Link href="/programmes" className="button-secondary inline-block">
                    Explore Our Footprint
                  </Link>
                  <Link href="/about" className="px-6 py-3 border border-sand/30 hover:border-sand rounded-xl text-sand font-medium transition-colors">
                    Read Our Story
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 flex justify-center w-full">
                <div className="relative w-full max-w-2xl min-h-[340px] sm:min-h-[440px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-sand/20">
                  <Image
                    src="/founder-speech.jpg"
                    alt="The Journey So Far - Humanity First"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-ink/40 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Field Ledger */}
      <FieldLedger />

      {/* Programmes Carousel */}
      <ProgrammeCarousel />

      {/* Field Notes Preview — light section */}
      <section className="py-24 px-4 bg-sand">
        <div className="container-goldcoast">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
              <div>
                <span className="eyebrow text-mangrove bg-mangrove/10 mb-3">
                  From the Field
                </span>
                <h2
                  className="prose-heading"
                  style={{ fontSize: 'var(--text-section)' }}
                >
                  Field Notes
                </h2>
              </div>
              <Link
                href="/field-notes"
                className="text-clay font-medium link-hover-underline"
              >
                View All →
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Flood Relief 2022',
                date: 'December 2022',
                excerpt: 'Community response to flooding with 40-person shelter capacity.',
              },
              {
                title: 'Protect the Girl Child',
                date: 'Ongoing',
                excerpt: 'Education and protection initiatives for vulnerable girls in the Niger Delta.',
              },
              {
                title: 'Skills Acquisition',
                date: '2023–2024',
                excerpt: 'Fashion and vocational training with TKM Fashion Academy partners.',
              },
            ].map((note, idx) => (
              <ScrollReveal key={idx} delay={idx * 80}>
                <article className="bg-paper p-6 rounded-xl border border-sand-deep hover-lift card-hover-border-clay">
                  <div className="font-mono text-xs text-mangrove mb-2">{note.date}</div>
                  <h3 className="prose-heading text-lg mb-3">{note.title}</h3>
                  <p className="text-sm text-mangrove mb-4">{note.excerpt}</p>
                  <Link
                    href="/field-notes"
                    className="text-clay font-mono text-xs link-hover-underline"
                  >
                    Read More →
                  </Link>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-24 px-4 bg-teal text-paper">
        <ScrollReveal>
          <div className="container-goldcoast text-center max-w-2xl mx-auto">
            <span className="eyebrow text-sand bg-sand/10 mb-4 inline-block">
              Get Involved
            </span>
            <h2
              className="font-serif font-bold mb-6"
              style={{ fontSize: 'var(--text-section)' }}
            >
              Support Our Work
            </h2>
            <p
              className="mb-8 opacity-90"
              style={{ fontSize: 'var(--text-body-lg)' }}
            >
              Your donation directly supports health outreach, educational initiatives, and youth development programmes across the Niger Delta.
            </p>
            <p className="text-sm mb-8 opacity-75">
              We accept donations via direct bank transfer or cryptocurrency.
            </p>
            <Link href="/donate" className="button-primary inline-block px-8 py-4 rounded-xl">
              Make a Donation
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}
