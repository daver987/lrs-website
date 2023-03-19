import { inferAsyncReturnType } from '@trpc/server'
import type { H3Event } from 'h3'
import { stripe } from '~/server/services/stripeInit'

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export function createContext(_event: H3Event) {
  /**
   * Add any trpc-request context here. E.g., you could add `prisma` like this (if you've added it via sidebase):
   * ```ts
   * return { prisma: _event.context.prisma }
   * ```
   */
  return {
    prisma: _event.context.prisma,
    twilioClient: _event.context.twilioClient,
    stripe: stripe,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
