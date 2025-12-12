const SKINS_URL = 'https://minelp.deno.dev/skin/exact/valhalla/%s'

let controller: AbortController | null = null

export async function fetchSkin(nickname: string): Promise<File> {
  controller?.abort()
  controller = new AbortController()

  const r = await fetch(SKINS_URL.replace('%s', nickname), {
    signal: controller.signal,
  })

  if (!r.ok) {
    const json = await r.json()
    throw new Error(json.error)
  }

  const blob = await r.blob()
  const xNickname = r.headers.get('X-Nickname') ?? nickname

  return new File([blob], `${xNickname}.png`)
}
