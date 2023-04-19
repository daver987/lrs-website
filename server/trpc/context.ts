import { inferAsyncReturnType } from '@trpc/server'
import type { H3Event } from 'h3'
import { getServerSession } from '#auth'
import { prismaDb } from '~/server/prismadb'
import { stripe } from '~/server/services/stripeInit'
import openai from 'openai'

const apiKey = useRuntimeConfig().OPENAI_API_KEY
const { Configuration, OpenAIApi } = openai
const configuration = new Configuration({ apiKey })
const openAI = new OpenAIApi(configuration)

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
    prisma: prismaDb,
    twilioClient: _event.context.twilioClient,
    stripe: stripe,
    openai: openAI,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
