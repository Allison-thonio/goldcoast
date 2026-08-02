export const metadata = {
  title: 'About Goldcoast Foundation',
  description: 'Our mission, vision, leadership team, and partners.',
}

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-sand py-16 px-4">
        <div className="container-goldcoast text-center max-w-2xl mx-auto">
          <h1 className="prose-heading text-4xl mb-4">About Us</h1>
          <p className="text-mangrove text-lg">
            Dedicated to serving vulnerable communities in the Niger Delta through health, education, and youth development.
          </p>
        </div>
      </section>

      {/* Founder */}
      <section className="py-16 px-4">
        <div className="container-goldcoast max-w-2xl mx-auto">
          <h2 className="prose-heading text-2xl mb-6">Our Founder</h2>
          <p className="text-mangrove mb-4">
            <strong>Moses Oruaze Dickson</strong>, Managing Solicitor at Triax Solicitors, founded Goldcoast Developmental Foundation in 2012 in memory of Goldcoast Dickson.
          </p>
          <p className="text-mangrove">
            What began as a personal tribute has grown into a comprehensive development foundation serving thousands across health, education, and youth programming.
          </p>
        </div>
      </section>

      {/* Vision */}
      <section className="bg-sand-deep py-16 px-4">
        <div className="container-goldcoast max-w-2xl mx-auto">
          <h2 className="prose-heading text-2xl mb-6">Our Vision</h2>
          <p className="text-mangrove mb-4">
            A Niger Delta community where every person has access to quality health care, meaningful education, and opportunities to develop their potential.
          </p>
          <p className="text-mangrove">
            We envision sustainable development built on the principle of service, passing opportunities from one generation to the next.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4">
        <div className="container-goldcoast max-w-2xl mx-auto">
          <h2 className="prose-heading text-2xl mb-12">Timeline</h2>
          <div className="space-y-8">
            {[
              { year: '2012', event: 'Goldcoast Developmental Foundation established' },
              { year: '2013', event: 'CAC registration as formal nonprofit organization' },
              { year: '2018', event: 'Flood relief response in 5 IDP camps' },
              { year: '2022', event: 'Established 40-person emergency shelter; 10th anniversary' },
              { year: '2024', event: 'Ongoing Niger Delta Talent Spotlight and community programmes' },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="font-mono text-sm text-mangrove min-w-12">{item.year}</div>
                <div className="border-l border-sand-deep pl-4 pb-4">
                  <p className="text-mangrove">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-sand py-16 px-4">
        <div className="container-goldcoast">
          <h2 className="prose-heading text-2xl mb-12 text-center">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { name: 'Moses O. Dickson', role: 'Founder & President' },
              { name: 'Izu Brenda', role: 'Coordinator' },
              { name: 'Blessing Akinsunmade', role: 'Acting Administrator' },
              { name: 'Geku Philemon', role: 'Account Officer' },
              { name: 'Grace Dickson', role: 'Programme Director, Health' },
              { name: 'Anita Dickson', role: 'Programme Director, Education' },
            ].map((person, idx) => (
              <div key={idx} className="text-center">
                <h3 className="prose-heading font-semibold mb-1">{person.name}</h3>
                <p className="text-sm text-mangrove">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 px-4">
        <div className="container-goldcoast">
          <h2 className="prose-heading text-2xl mb-12 text-center">Our Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
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
              <div key={idx} className="p-4 bg-sand rounded text-sm text-mangrove">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
