export const metadata = {
  title: 'Terms of Service | Goldcoast Foundation',
  description: 'Terms and conditions for using our website and services.',
}

export default function Terms() {
  return (
    <div className="min-h-screen">
      <section className="bg-sand py-16 px-4">
        <div className="container-goldcoast max-w-3xl">
          <h1 className="prose-heading text-4xl mb-4">Terms of Service</h1>
          <p className="text-mangrove text-sm">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container-goldcoast max-w-3xl">
          <div className="prose prose-sm max-w-none space-y-6 text-mangrove">
            <p className="text-red-600 font-semibold">
              ⚠️ NEEDS LEGAL REVIEW: These terms require review and approval by legal counsel before deployment.
            </p>

            <div>
              <h2 className="prose-heading text-xl font-semibold text-ink mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </div>

            <div>
              <h2 className="prose-heading text-xl font-semibold text-ink mb-3">2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on Goldcoast Foundation's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transmit the materials over any network</li>
              </ul>
            </div>

            <div>
              <h2 className="prose-heading text-xl font-semibold text-ink mb-3">3. Disclaimer</h2>
              <p>
                The materials on Goldcoast Foundation's website are provided on an 'as is' basis. Goldcoast Foundation makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </div>

            <div>
              <h2 className="prose-heading text-xl font-semibold text-ink mb-3">4. Limitations</h2>
              <p>
                In no event shall Goldcoast Foundation or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Goldcoast Foundation's website.
              </p>
            </div>

            <div>
              <h2 className="prose-heading text-xl font-semibold text-ink mb-3">5. Accuracy of Materials</h2>
              <p>
                The materials appearing on Goldcoast Foundation's website could include technical, typographical, or photographic errors. Goldcoast Foundation does not warrant that any of the materials on its website are accurate, complete, or current.
              </p>
            </div>

            <div>
              <h2 className="prose-heading text-xl font-semibold text-ink mb-3">6. Modifications</h2>
              <p>
                Goldcoast Foundation may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </div>

            <div>
              <h2 className="prose-heading text-xl font-semibold text-ink mb-3">7. Contact Us</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at info@goldcoast.ng.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
