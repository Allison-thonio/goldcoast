import ContactForm from '@/components/ContactForm'

export const metadata = {
  title: 'Contact | Goldcoast Foundation',
  description: 'Get in touch with Goldcoast Developmental Foundation.',
}

export default function Contact() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-sand py-16 px-4">
        <div className="container-goldcoast text-center">
          <h1 className="prose-heading text-4xl mb-4">Get In Touch</h1>
          <p className="text-mangrove text-lg">We'd love to hear from you.</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-4">
        <div className="container-goldcoast">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="prose-heading font-semibold mb-2">Address</h3>
                <p className="text-sm text-mangrove">
                  71 Greenvilla Road<br />
                  Biogbolo, Yenagoa<br />
                  Bayelsa State, Nigeria
                </p>
              </div>

              <div>
                <h3 className="prose-heading font-semibold mb-2">Phone</h3>
                <p className="text-sm text-mangrove">
                  +234 805 139 2029<br />
                  +234 703 350 6197<br />
                  +234 808 573 2377
                </p>
              </div>

              <div>
                <h3 className="prose-heading font-semibold mb-2">Email</h3>
                <p className="text-sm text-mangrove">
                  <a href="mailto:info@goldcoast.ng" className="hover:text-clay">
                    info@goldcoast.ng
                  </a>
                </p>
              </div>

              <div>
                <h3 className="prose-heading font-semibold mb-2">Bank Details</h3>
                <p className="text-sm text-mangrove font-mono">
                  UBA Account: 1017079610<br />
                  Goldcoast Developmental Foundation
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-sand p-8 rounded">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
