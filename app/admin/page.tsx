'use client'

import { useUser } from '@clerk/nextjs'
import Link from 'next/link'

export default function AdminDashboard() {
  const { user } = useUser()

  const cards = [
    {
      title: 'Pending Donations',
      href: '/admin/donations?status=pending',
      icon: '💳',
    },
    {
      title: 'Volunteer Applications',
      href: '/admin/volunteers?status=applied',
      icon: '👥',
    },
    {
      title: 'Contact Messages',
      href: '/admin/contact',
      icon: '✉️',
    },
    {
      title: 'Audit Log',
      href: '/admin/audit-log',
      icon: '📋',
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="prose-heading text-4xl mb-2">Admin Dashboard</h1>
        <p className="text-mangrove">
          Welcome, {user?.firstName || user?.emailAddresses[0]?.emailAddress}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="p-6 bg-sand rounded border border-sand-deep hover:border-clay hover:shadow-lg transition-all group"
          >
            <div className="text-3xl mb-3">{card.icon}</div>
            <h3 className="prose-heading font-semibold group-hover:text-clay transition-colors">
              {card.title}
            </h3>
            <p className="text-xs text-mangrove mt-2">Click to view →</p>
          </Link>
        ))}
      </div>

      <div className="bg-sand-deep p-6 rounded">
        <h2 className="prose-heading text-lg mb-4">Quick Actions</h2>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/admin/donations" className="text-clay hover:underline">
              Review pending donations
            </Link>
          </li>
          <li>
            <Link href="/admin/volunteers" className="text-clay hover:underline">
              Process volunteer applications
            </Link>
          </li>
          <li>
            <Link href="/admin/settings" className="text-clay hover:underline">
              Manage admins and settings
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
