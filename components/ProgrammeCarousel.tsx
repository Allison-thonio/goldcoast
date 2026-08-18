'use client'

import { FeatureCarousel, FeatureItem } from '@/components/ui/feature-carousel'
import { Activity, GraduationCap, Users } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const GOLDCOAST_PROGRAMMES: FeatureItem[] = [
  {
    id: 'health',
    label: 'Healthcare Outreach',
    icon: Activity,
    image: '/community-health.jpg',
    description: 'Delivering free maternal & obstetric healthcare, disease screening, and essential medicines across underserved communities in the Niger Delta.',
    link: '/programmes/health',
    tag: 'Programme 01',
  },
  {
    id: 'education',
    label: 'Girl-Child Education',
    icon: GraduationCap,
    image: '/community-education.jpg',
    description: 'Providing full educational scholarships, school uniforms, books, and literacy programs to empower vulnerable children.',
    link: '/programmes/education',
    tag: 'Programme 02',
  },
  {
    id: 'youth',
    label: 'Youth & Skills Development',
    icon: Users,
    image: '/community-youth.jpg',
    description: 'Vocational training, creative fashion academies, digital skills acquisition, and talent spotlighting for sustainable youth livelihoods.',
    link: '/programmes/youth-development',
    tag: 'Programme 03',
  },
]

export default function ProgrammeCarousel() {
  return (
    <section className="py-20 px-4 bg-paper border-b border-sand-deep/40 relative overflow-hidden">
      <div className="container-goldcoast mb-8 text-center max-w-2xl mx-auto">
        <ScrollReveal>
          <span className="eyebrow text-teal-ink bg-sand/80 mb-3 inline-block">
            Core Pillars
          </span>
          <h2
            className="font-serif font-bold text-ink mb-4"
            style={{ fontSize: 'var(--text-section)' }}
          >
            Our Strategic Programmes
          </h2>
          <p className="text-mangrove leading-relaxed" style={{ fontSize: 'var(--text-body-lg)' }}>
            Driving continuous, generational change across health, education, and youth empowerment.
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={150}>
        <FeatureCarousel features={GOLDCOAST_PROGRAMMES} />
      </ScrollReveal>
    </section>
  )
}

