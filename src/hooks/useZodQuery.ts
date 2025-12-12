import type { UseQueryResult } from '@tanstack/react-query'
import type { ZodType } from 'zod'
import { useQuery } from '@tanstack/react-query'
import { ZodError } from 'zod'

export function useZodQuery<Schema extends ZodType>(
  schema: Schema,
  url: URL | string,
  enabled = true,
): UseQueryResult<Schema['_output']> {
  const result = useQuery({
    enabled,
    queryKey: [String(url)],
    queryFn: async () => {
      const r = await fetch(url)
      const json = await r.json()
      const data = schema.parse(json)

      return data
    },
    retry: (retryCount, error) => {
      return !(retryCount > 3 || error instanceof ZodError)
    },
  })

  if (result.error) {
    console.error(result.error)
  }

  return result
}
