import Link from 'next/link'

const PROGRAMME_DETAILS: Record<string, any> = {
  health: {
    title: 'Health',
    description: 'Community Health Outreach & Disease Prevention',
    whatWeDo: [
      'Obstetric care and maternal health education',
      'Communicable disease prevention (TB, cholera, HIV/AIDS)',
      'Noncommunicable disease awareness (cancer, cardiovascular, diabetes)',
      'Community health worker training',
      'Medical outreach camps and screenings',
    ],
    activeProjects: [
      'Medical Outreach on Obstetrics (2024)',
      'Communicable Disease Prevention Campaign',
      'Community Health Worker Initiative',
    ],
  },
  education: {
    title: 'Education',
    description: 'Educational Support & Skills Training',
    whatWeDo: [
      'Literacy programmes for underserved communities',
      'Vocational and skills training',
      'Educational scholarships and grants',
      'Protect the Girl Child initiative',
      'Curriculum support and teacher training',
    ],
    activeProjects: [
      'Protect the Girl Child Programme',
      'Skills Acquisition with TKM Fashion Academy (100+ trained)',
      'Inspire2Aspire mentorship programme',
    ],
  },
  youth: {
    title: 'Youth Development',
    description: 'Mentorship & Career Opportunities',
    whatWeDo: [
      'Talent identification and spotlighting',
      'Mentorship and career guidance',
      'Entrepreneurship training',
      'Leadership development',
      'Access to opportunities and networks',
    ],
    activeProjects: [
      'Niger Delta Talent Spotlight (₦100K grants)',
      'Youth Leadership Training',
      'Career Mentorship Network',
    ],
  },
}

export const generateStaticParams = () => {
  return Object.keys(PROGRAMME_DETAILS).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const programme = PROGRAMME_DETAILS[params.slug]
  return {
    title: `${programme.title} | Goldcoast Foundation`,
    description: programme.description,
  }
}

export default function ProgrammeDetail({ params }: { params: { slug: string } }) {
  const programme = PROGRAMME_DETAILS[params.slug]

  if (!programme) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Programme not found</h1>
          <Link href="/programmes" className="text-clay hover:underline">
            Back to Programmes
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-sand to-sand-deep py-20 px-4">
        <div className="container-goldcoast max-w-3xl mx-auto">
          <Link href="/programmes" className="text-clay text-sm font-mono mb-4 inline-block hover:underline">
            ← Back to Programmes
          </Link>
          <h1 className="prose-heading text-5xl mb-4">{programme.title}</h1>
          <p className="text-lg text-mangrove">{programme.description}</p>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 px-4">
        <div className="container-goldcoast max-w-3xl mx-auto">
          <h2 className="prose-heading text-2xl mb-8">What We Do</h2>
          <ul className="space-y-4">
            {programme.whatWeDo.map((point: string, idx: number) => (
              <li key={idx} className="flex gap-4 items-start">
                <span className="text-clay font-mono text-sm min-w-6 mt-1">✓</span>
                <span className="text-mangrove">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Active Projects */}
      <section className="bg-sand py-20 px-4">
        <div className="container-goldcoast max-w-3xl mx-auto">
          <h2 className="prose-heading text-2xl mb-8">Active Projects</h2>
          <div className="space-y-4">
            {programme.activeProjects.map((project: string, idx: number) => (
              <div key={idx} className="p-4 bg-paper rounded border border-sand-deep">
                <p className="font-medium text-ink">{project}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-sand-deep py-20 px-4">
        <div className="container-goldcoast">
          <h2 className="prose-heading text-2xl mb-12 text-center">Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="font-serif text-4xl font-bold text-teal mb-2">100+</div>
              <p className="text-sm text-mangrove">Persons reached</p>
            </div>
            <div className="text-center">
              <div className="font-serif text-4xl font-bold text-clay mb-2">12+</div>
              <p className="text-sm text-mangrove">Years of service</p>
            </div>
            <div className="text-center">
              <div className="font-serif text-4xl font-bold text-mangrove mb-2">3</div>
              <p className="text-sm text-mangrove">Communities</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-paper">
        <div className="container-goldcoast max-w-2xl mx-auto text-center">
          <h2 className="prose-heading text-2xl mb-6">Support {programme.title}</h2>
          <p className="text-mangrove mb-8">
            Your donation directly funds this programme and helps us extend our impact across the Niger Delta.
          </p>
          <Link
            href={`/donate?programme=${params.slug}`}
            className="button-primary inline-block"
          >
            Donate Now
          </Link>
        </div>
      </section>
    </div>
  )
}
