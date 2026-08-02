import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-sand text-ink border-t border-sand-deep mt-24 py-12">
      <div className="container-goldcoast">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Goldcoast Foundation</h3>
            <p className="text-sm leading-relaxed">
              Service, carried on from one generation to the next. Registered Foundation in Bayelsa, Nigeria, established 2012.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="/about" className="hover:text-clay transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/programmes" className="hover:text-clay transition-colors">
                  Programmes
                </Link>
              </li>
              <li>
                <Link href="/field-notes" className="hover:text-clay transition-colors">
                  Field Notes
                </Link>
              </li>
              <li>
                <Link href="/donate" className="hover:text-clay transition-colors">
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Legal</h3>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="/privacy-policy" className="hover:text-clay transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-clay transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-clay transition-colors">
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
