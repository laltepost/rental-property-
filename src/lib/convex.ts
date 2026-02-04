import { ConvexReactClient } from 'convex/react'

const convexUrl = import.meta.env.VITE_CONVEX_URL

if (!convexUrl) {
  throw new Error('Missing VITE_CONVEX_URL in .env.local')
}

export const convex = new ConvexReactClient(convexUrl)
