'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import React from 'react'

// Initialize Convex client only if URL is provided (for local dev, this may be empty)
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || 'https://localhost:3000'
const convex = new ConvexReactClient(convexUrl)

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ConvexProvider client={convex}>
        {children}
      </ConvexProvider>
    </ClerkProvider>
  )
}
