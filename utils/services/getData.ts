/**
 * Refactored data access to composable-style TanStack Query handlers.
 *
 * New preferred usage (reactive, no artificial async wrapper):
 *
 * const { data, isLoading } = useSalesTaxQuery()
 *
 * Backward-compatible async helpers (getSalesTax, getLineItems, etc.)
 * are still exported but marked deprecated. They use suspense() to
 * await the query and then return the same shape as before to avoid
 * breaking existing callers.
 *
 * Improvements:
 * - Centralized, type-safe query keys
 * - Parameter included in quote query key to avoid cache collisions
 * - Consistent naming: useXQuery composables
 * - `enabled` gating for quote query when no quote number
 */

export const queryKeys = {
  salesTax: () => ['salesTax'] as const,
  lineItems: () => ['lineItem'] as const, // keeping original singular key to preserve cache continuity
  vehicle: () => ['vehicle'] as const,
  service: () => ['service'] as const,
  quote: (quoteNumber: number) => ['quote', quoteNumber] as const,
}

// --- Composable Queries (preferred) ---

export function useSalesTaxQuery() {
  return useQuery({
    queryKey: queryKeys.salesTax(),
    queryFn: () => useTrpc().salesTax.get.query(),
  })
}

export function useLineItemsQuery() {
  return useQuery({
    queryKey: queryKeys.lineItems(),
    queryFn: () => useTrpc().lineItem.get.query(),
  })
}

export function useVehicleQuery() {
  return useQuery({
    queryKey: queryKeys.vehicle(),
    queryFn: () => useTrpc().vehicle.get.query(),
  })
}

export function useServiceQuery() {
  return useQuery({
    queryKey: queryKeys.service(),
    queryFn: () => useTrpc().service.get.query(),
  })
}

export function useQuoteQuery(quoteNumber: string | number | undefined) {
  return useQuery({
    queryKey:
      typeof quoteNumber === 'number'
        ? queryKeys.quote(quoteNumber)
        : typeof quoteNumber === 'string' && quoteNumber.trim()
          ? queryKeys.quote(Number.parseInt(quoteNumber, 10))
          : (['quote', 'pending'] as const),
    enabled:
      !!quoteNumber &&
      (typeof quoteNumber === 'number' ||
        (typeof quoteNumber === 'string' && quoteNumber.trim().length > 0)),
    queryFn: () => {
      if (!quoteNumber)
        throw createError({
          statusCode: 400,
          statusMessage: 'Quote number is required',
        })
      const parsed =
        typeof quoteNumber === 'number'
          ? quoteNumber
          : Number.parseInt(quoteNumber, 10)
      if (Number.isNaN(parsed))
        throw createError({
          statusCode: 400,
          statusMessage: 'Invalid quote number',
        })
      return useTrpc().quote.get.query({ quote_number: parsed })
    },
  })
}

// --- Deprecated Async Helpers (backward compatibility) ---

/**
 * @deprecated Use useSalesTaxQuery() instead for reactive usage.
 * Returns the raw value (was data.value previously).
 */
export async function getSalesTax() {
  const q = useSalesTaxQuery()
  await q.suspense()
  return q.data.value
}

/**
 * @deprecated Use useLineItemsQuery().
 * Returns the Ref (previous implementation returned the ref, not its value).
 */
export async function getLineItems() {
  const q = useLineItemsQuery()
  await q.suspense()
  return q.data
}

/**
 * @deprecated Use useVehicleQuery().
 * Returns the Ref (matches previous behavior).
 */
export async function getVehicle() {
  const q = useVehicleQuery()
  await q.suspense()
  return q.data
}

/**
 * @deprecated Use useServiceQuery().
 * Returns the Ref (matches previous behavior).
 */
export async function getService() {
  const q = useServiceQuery()
  await q.suspense()
  return q.data
}

/**
 * @deprecated Use useQuoteQuery(quoteNumber).
 * Returns the raw value (previous implementation returned data.value).
 */
export async function getQuote(quoteNumber: string) {
  if (!quoteNumber)
    throw createError({
      statusCode: 400,
      statusMessage: 'Quote number is required',
    })
  const q = useQuoteQuery(quoteNumber)
  await q.suspense()
  return q.data.value
}
