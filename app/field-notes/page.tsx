import Link from 'next/link'

export const metadata = {
  title: 'Field Notes | Goldcoast Foundation',
  description: 'Stories, projects, and impact from our programmes.',
}

const NOTES = [
  {
    slug: 'flood-relief-2022',
    title: 'Flood Relief 2022',
    category: 'health',
    date: 'December 2022',
    excerpt: 'Emergency response providing shelter and support to flood-affected communities.',
  },
  {
    slug: 'protect-girl-child',
    title: 'Protect the Girl Child',
    category: 'education',
    date: 'Ongoing',
    excerpt: 'Educational and protective initiatives for vulnerable girls across the Niger Delta.',
  },
  {
    slug: 'skills-acquisition',
    title: 'Skills Acquisition Programme',
    category: 'education',
    date: '2023–2024',
    excerpt: 'Fashion and vocational training in partnership with TKM Fashion Academy, training 100+ youth.',
  },
  {
    slug: 'medical-outreach',
    title: 'Medical Outreach on Obstetrics',
    category: 'health',
    date: '2024',
    excerpt: 'Community health outreach focusing on maternal health and disease prevention.',
  },
  {
    slug: 'inspire-aspire',
    title: 'Inspire2Aspire',
    category: 'youth',
    date: 'Ongoing',
    excerpt: 'Mentorship and aspiration-building programme for young people in the Niger Delta.',
  },
  {
    slug: 'niger-delta-talent',
    title: 'Niger Delta Talent Spotlight',
    category: 'youth',
    date: 'Ongoing',
    excerpt: 'Identifying and supporting emerging talent with grants and opportunities (₦100K example).',
  },
]

export default function FieldNotes() {
  const categories = ['all', 'health', 'education', 'youth']

  return (
    <div>
      {/* Hero */}
      <section className="bg-sand py-16 px-4">
        <div className="container-goldcoast text-center">
          <h1 className="prose-heading text-4xl mb-4">Field Notes</h1>
          <p className="text-mangrove text-lg max-w-2xl mx-auto">
            Stories and updates from our work across the Niger Delta.
          </p>
        </div>
      </section>

      {/* Notes Grid */}
      <section className="py-20 px-4">
        <div className="container-goldcoast">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {NOTES.map((note) => (
              <article
                key={note.slug}
                className="bg-sand p-6 rounded border border-sand-deep hover:border-clay hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="font-mono text-xs text-mangrove uppercase px-2 py-1 bg-paper rounded">
                    {note.category}
                  </span>
                  <time className="font-mono text-xs text-mangrove">{note.date}</time>
                </div>
                <h2 className="prose-heading text-lg mb-3 line-clamp-2">{note.title}</h2>
                <p className="text-sm text-mangrove mb-4 line-clamp-3">{note.excerpt}</p>
                <Link
                  href={`/field-notes/${note.slug}`}
                  className="text-clay font-mono text-xs hover:underline"
                >
                  Read More →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
