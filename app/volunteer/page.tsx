import VolunteerForm from '@/components/VolunteerForm'

export const metadata = {
  title: 'Volunteer | Goldcoast Foundation',
  description: 'Join our team and make an impact across health, education, and youth development.',
}

export default function VolunteerPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-sand py-16 px-4">
        <div className="container-goldcoast text-center">
          <h1 className="prose-heading text-4xl mb-4">Join Our Team</h1>
          <p className="text-mangrove text-lg max-w-2xl mx-auto">
            Volunteer with Goldcoast and help us create positive change across health, education, and youth development.
          </p>
        </div>
      </section>

      {/* Volunteer Form */}
      <VolunteerForm />

      {/* Process */}
      <section className="py-20 px-4 bg-paper">
        <div className="container-goldcoast max-w-3xl mx-auto">
          <h2 className="prose-heading text-2xl mb-12 text-center">Our Volunteer Process</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Apply', desc: 'Submit your application' },
              { num: '02', title: 'Screening', desc: 'Initial evaluation' },
              { num: '03', title: 'Induction', desc: 'Training & orientation' },
              { num: '04', title: 'Serve', desc: 'Start volunteering' },
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="font-serif text-4xl font-bold text-teal mb-2">{step.num}</div>
                <h3 className="prose-heading font-semibold mb-2">{step.title}</h3>
                <p className="text-xs text-mangrove">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
