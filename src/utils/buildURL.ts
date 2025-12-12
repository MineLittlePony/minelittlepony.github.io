export function buildURL<SearchParams extends Record<string, unknown>>(
  url: URL | string,
  searchParams: SearchParams,
) {
  url = new URL(url)

  for (const key in searchParams) {
    const value = searchParams[key]
    url.searchParams.set(key, JSON.stringify(value))
  }

  return url
}
