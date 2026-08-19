import { Suspense } from 'react'
import DonateForm from '@/components/DonateForm'
export const metadata = {
  title: 'Donate | Goldcoast Foundation',
  description: 'Support our work through direct bank transfer.',
}
export default function DonatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen py-12">Loading...</div>}>
      <DonateForm />
    </Suspense>
  )
}
