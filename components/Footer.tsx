import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-sand text-ink border-t border-sand-deep mt-24 py-12">
      <div className="container-goldcoast">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About */}
          <div>
            <h3
              className="font-serif font-bold mb-4"
              style={{ fontSize: 'var(--text-body-lg)' }}
            >
              Goldcoast Foundation
            </h3>
            <p className="text-sm leading-relaxed">
              Service, carried on from one generation to the next. Registered Foundation in Bayelsa, Nigeria, established 2012.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="font-serif font-bold mb-4"
              style={{ fontSize: 'var(--text-body-lg)' }}
            >
              Quick Links
            </h3>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="/about" className="link-hover-clay">
                  About
                </Link>
              </li>
              <li>
                <Link href="/programmes" className="link-hover-clay">
                  Programmes
                </Link>
              </li>
              <li>
                <Link href="/field-notes" className="link-hover-clay">
                  Field Notes
                </Link>
              </li>
              <li>
                <Link href="/donate" className="link-hover-clay">
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3
              className="font-serif font-bold mb-4"
              style={{ fontSize: 'var(--text-body-lg)' }}
            >
              Legal
            </h3>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="/privacy-policy" className="link-hover-clay">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="link-hover-clay">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="link-hover-clay">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sand-deep pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Goldcoast Developmental Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
