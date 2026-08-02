export const metadata = {
  title: 'Privacy Policy | Goldcoast Foundation',
  description: 'Our privacy policy and data protection practices.',
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen">
      <section className="bg-sand py-16 px-4">
        <div className="container-goldcoast max-w-3xl">
          <h1 className="prose-heading text-4xl mb-4">Privacy Policy</h1>
          <p className="text-mangrove text-sm">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container-goldcoast max-w-3xl">
          <div className="prose prose-sm max-w-none space-y-6 text-mangrove">
            <p className="text-red-600 font-semibold">
              ⚠️ NEEDS LEGAL REVIEW: This privacy policy requires review and approval by legal counsel before deployment.
            </p>

            <div>
              <h2 className="prose-heading text-xl font-semibold text-ink mb-3">1. Introduction</h2>
              <p>
                Goldcoast Developmental Foundation (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
              </p>
            </div>

            <div>
              <h2 className="prose-heading text-xl font-semibold text-ink mb-3">2. Information We Collect</h2>
              <p>
                We may collect information about you in a variety of ways. The information we may collect on the site includes:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Your name, email address, and phone number</li>
                <li>Donation details and payment information</li>
                <li>Volunteer application information</li>
                <li>Contact form submissions</li>
                <li>Technical information about your device and usage patterns</li>
              </ul>
            </div>

            <div>
              <h2 className="prose-heading text-xl font-semibold text-ink mb-3">3. Use of Your Information</h2>
              <p>
                We use the information we collect in the following ways:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>To process donations and send receipts</li>
                <li>To evaluate volunteer applications</li>
                <li>To respond to your inquiries and requests</li>
                <li>To improve our website and services</li>
                <li>To send periodic updates and newsletters (with your consent)</li>
              </ul>
            </div>

            <div>
              <h2 className="prose-heading text-xl font-semibold text-ink mb-3">4. Security of Your Information</h2>
              <p>
                We implement appropriate technical and organizational measures designed to protect personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </div>

            <div>
              <h2 className="prose-heading text-xl font-semibold text-ink mb-3">5. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at info@goldcoast.ng.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
