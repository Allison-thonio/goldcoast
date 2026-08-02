'use client'

import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Link from 'next/link'

export default function AdminDonations() {
  const pending = useQuery(api.donations.getDonationsByStatus, { status: 'pending' })
  const verified = useQuery(api.donations.getDonationsByStatus, { status: 'verified' })

  return (
    <div>
      <div className="mb-8">
        <h1 className="prose-heading text-3xl mb-2">Donations</h1>
        <p className="text-mangrove text-sm">Manage and verify donations</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-sand rounded">
          <div className="font-serif text-3xl font-bold text-teal">{pending?.length || 0}</div>
          <p className="text-sm text-mangrove mt-2">Pending</p>
        </div>
        <div className="p-4 bg-sand rounded">
          <div className="font-serif text-3xl font-bold text-mangrove">{verified?.length || 0}</div>
          <p className="text-sm text-mangrove mt-2">Verified</p>
        </div>
        <div className="p-4 bg-sand rounded">
          <div className="font-serif text-3xl font-bold text-clay">{((pending?.length || 0) + (verified?.length || 0))}</div>
          <p className="text-sm text-mangrove mt-2">Total</p>
        </div>
      </div>

      <div className="bg-sand p-6 rounded">
        <h2 className="prose-heading font-semibold mb-4">Pending Donations</h2>
        {pending && pending.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-sand-deep">
                  <th className="text-left py-2 px-2">Donor</th>
                  <th className="text-left py-2 px-2">Amount</th>
                  <th className="text-left py-2 px-2">Method</th>
                  <th className="text-left py-2 px-2">Date</th>
                  <th className="text-left py-2 px-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {pending.map((donation: any) => (
                  <tr key={donation._id} className="border-b border-sand-deep hover:bg-sand-deep">
                    <td className="py-2 px-2">{donation.donorName}</td>
                    <td className="py-2 px-2">₦{donation.amount.toLocaleString()}</td>
                    <td className="py-2 px-2 capitalize text-xs">{donation.method}</td>
                    <td className="py-2 px-2 text-xs text-mangrove">
                      {new Date(donation.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-2">
                      <Link href={`/admin/donations/${donation._id}`} className="text-clay text-xs hover:underline">
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-mangrove">No pending donations</p>
        )}
      </div>
    </div>
  )
}
