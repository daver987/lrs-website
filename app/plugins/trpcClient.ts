/**
 * This is the client-side entry point for your tRPC API. It is used to create the `api` object which
 * contains the Next.js App-wrapper, as well as your type-safe React Query hooks.
 *
 * We also create a few inference helpers for input and output types.
 */

import { createTRPCNuxtClient } from 'trpc-nuxt/client'
import { httpBatchLink } from '@trpc/client'
import { FetchError } from 'ofetch'
import superjson from 'superjson'
import type { AppRouter } from '~~/server/trpc/routers'

type Init = RequestInit | undefined

export default defineNuxtPlugin(() => {
  const client = createTRPCNuxtClient<AppRouter>({
    transformer: superjson,
    links: [
      httpBatchLink({
        url: '/api/trpc',
        // We provide our own fetch to leverage the use of Nuxt's $fetch
        // trpc-nuxt has its own NuxtHttpBatchLink, but it doesn't handle error well
        // in the case of a FetchError, the error won't be properly mzpped in the trpc client. This implementation fixes it
        async fetch(input: RequestInfo | URL, init?: RequestInit) {
          try {
            const url =
              typeof input === 'string'
                ? input
                : input instanceof URL
                  ? input.toString()
                  : (input as Request).url
            const response = await $fetch.raw(url, init as any)
            return {
              ...response,
              json: async () => response._data,
            }
          } catch (err: any) {
            if (err instanceof FetchError) {
              return new Response(JSON.stringify(err.data ?? null), {
                status:
                  (err as any).statusCode ??
                  (err as any).response?.status ??
                  500,
                headers: new Headers({ 'content-type': 'application/json' }),
              }) as Response
            }
            throw err
          }
        },
      }),
    ],
  })

  return {
    provide: {
      client,
    },
  }
})
