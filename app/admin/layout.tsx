import { ClerkLoading, ClerkLoaded } from '@clerk/nextjs'
import Link from 'next/link'

export const metadata = {
  title: 'Admin Dashboard | Goldcoast Foundation',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-paper">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-teal text-paper border-r border-teal-ink p-6 overflow-y-auto">
          <h2 className="font-serif text-2xl font-bold mb-8">Admin Panel</h2>
          <nav className="space-y-2">
            {[
              { label: 'Dashboard', href: '/admin' },
              { label: 'Donations', href: '/admin/donations' },
              { label: 'Volunteers', href: '/admin/volunteers' },
              { label: 'Contact Messages', href: '/admin/contact' },
              { label: 'Audit Log', href: '/admin/audit-log' },
              { label: 'Settings', href: '/admin/settings' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 rounded hover:bg-teal-ink transition-colors text-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <hr className="my-6 border-teal-ink" />
          <div className="text-xs opacity-75">
            <p className="mb-2">Authenticated Admin Only</p>
            <a href="/api/auth/signout" className="text-xs hover:underline">
              Sign Out
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            <ClerkLoading>
              <div className="text-center py-12">Loading...</div>
            </ClerkLoading>
            <ClerkLoaded>{children}</ClerkLoaded>
          </div>
        </main>
      </div>
    </div>
  )
}
