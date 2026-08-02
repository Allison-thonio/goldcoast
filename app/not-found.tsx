import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-4">
      <div className="text-center max-w-2xl">
        <div className="font-serif text-9xl font-bold text-sand-deep mb-4">404</div>
        <h1 className="prose-heading text-4xl mb-4">Page Not Found</h1>
        <p className="text-lg text-mangrove mb-8">
          We couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/" className="button-primary">
            Return Home
          </Link>
          <Link href="/contact" className="px-6 py-3 border-2 border-clay text-clay rounded font-medium hover:bg-clay hover:text-paper transition-colors">
            Get Help
          </Link>
        </div>
      </div>
    </div>
  )
}
