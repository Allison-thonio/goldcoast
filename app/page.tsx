import Hero from '@/components/Hero'
import FieldLedger from '@/components/FieldLedger'
import ProgrammeCarousel from '@/components/ProgrammeCarousel'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Text Reveals and Photo Collage */}
      <Hero />

      {/* Field Ledger */}
      <FieldLedger />

      {/* Programmes Carousel */}
      <ProgrammeCarousel />

      {/* Field Notes Preview */}
      <section className="py-24 px-4 bg-sand">
        <div className="container-goldcoast">
          <div className="flex justify-between items-end mb-12">
            <h2 className="prose-heading text-4xl">Field Notes</h2>
            <Link href="/field-notes" className="text-clay font-medium hover:underline">
              View All →
            </Link>
          </div>
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
              <article
                key={idx}
                className="bg-paper p-6 rounded border border-sand-deep hover:border-clay transition-colors"
              >
                <div className="font-mono text-xs text-mangrove mb-2">{note.date}</div>
                <h3 className="prose-heading text-lg mb-3">{note.title}</h3>
                <p className="text-sm text-mangrove mb-4">{note.excerpt}</p>
                <Link href="/field-notes" className="text-clay font-mono text-xs hover:underline">
                  Read More →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Donate CTA */}
      <section className="py-24 px-4 bg-teal text-paper">
        <div className="container-goldcoast text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl font-bold mb-6">Support Our Work</h2>
          <p className="text-lg mb-8 opacity-90">
            Your donation directly supports health outreach, educational initiatives, and youth development programmes across the Niger Delta.
          </p>
          <p className="text-sm mb-8 opacity-75">
            We accept donations via card, bank transfer, or cryptocurrency.
          </p>
          <Link href="/donate" className="button-primary inline-block">
            Make a Donation
          </Link>
        </div>
      </section>
    </div>
  )
}
