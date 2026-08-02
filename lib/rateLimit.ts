import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

export async function rateLimit(
  key: string,
  limit: number,
  window: number
): Promise<{ success: boolean; remaining: number }> {
  try {
    const current = await redis.incr(key)

    if (current === 1) {
      await redis.expire(key, window)
    }

    if (current > limit) {
      return { success: false, remaining: 0 }
    }

    return { success: true, remaining: limit - current }
  } catch (error) {
    console.error('[Rate Limit] Error:', error)
    // Fail open if Redis is unavailable
    return { success: true, remaining: limit }
  }
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip')
  return ip || 'unknown'
}
