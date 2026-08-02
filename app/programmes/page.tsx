import Link from 'next/link'

export const metadata = {
  title: 'Programmes | Goldcoast Foundation',
  description: 'Health, Education, and Youth Development programmes.',
}

const PROGRAMMES = [
  {
    slug: 'health',
    title: 'Health',
    description: 'Community health outreach, obstetric care, and disease prevention.',
    icon: '01',
  },
  {
    slug: 'education',
    title: 'Education',
    description: 'Educational support, skills training, and literacy initiatives.',
    icon: '02',
  },
  {
    slug: 'youth',
    title: 'Youth Development',
    description: 'Mentorship, talent spotlighting, and career development.',
    icon: '03',
  },
]

export default function Programmes() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-sand py-16 px-4">
        <div className="container-goldcoast text-center">
          <h1 className="prose-heading text-4xl mb-4">Our Programmes</h1>
          <p className="text-mangrove text-lg max-w-2xl mx-auto">
            Three integrated programmes working together to create sustainable development in the Niger Delta.
          </p>
        </div>
      </section>

      {/* Programmes Cards */}
      <section className="py-20 px-4">
        <div className="container-goldcoast">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROGRAMMES.map((prog) => (
              <Link
                key={prog.slug}
                href={`/programmes/${prog.slug}`}
                className="group p-8 border border-sand-deep rounded hover:shadow-xl hover:border-clay transition-all"
              >
                <div className="font-mono text-3xl font-bold text-teal group-hover:text-clay transition-colors mb-4">
                  {prog.icon}
                </div>
                <h2 className="prose-heading text-2xl mb-3 group-hover:text-clay transition-colors">
                  {prog.title}
                </h2>
                <p className="text-mangrove text-sm mb-6">{prog.description}</p>
                <span className="text-clay font-mono text-xs">Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Integrated Approach */}
      <section className="bg-sand-deep py-16 px-4">
        <div className="container-goldcoast max-w-2xl mx-auto">
          <h2 className="prose-heading text-2xl mb-6 text-center">Integrated Approach</h2>
          <p className="text-mangrove text-center mb-8">
            Our three programmes work in concert, recognizing that health, education, and youth opportunity are interconnected foundations for sustainable development.
          </p>
          <div className="space-y-4 text-sm text-mangrove">
            <p>✓ Community-led initiatives addressing local priorities</p>
            <p>✓ Partnerships with government, NGOs, and private sector</p>
            <p>✓ Focus on vulnerable populations and underserved communities</p>
            <p>✓ Emphasis on capacity building and long-term sustainability</p>
          </div>
        </div>
      </section>
    </div>
  )
}
