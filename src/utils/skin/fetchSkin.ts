import { $fetch } from 'ofetch'

const SKINS_URL = 'https://skins.minelittlepony-mod.com/api/v1/user/lookup/name/%s'

let controller: AbortController | null = null

interface Texture {
  url: string
  metadata?: Record<string, string>
}
interface Textures {
  profileId: string
  profileName: string
  textures: Record<string, Texture>
}

export async function fetchSkin(nickname: string): Promise<File> {
  controller?.abort()
  controller = new AbortController()

  const fetch = $fetch.create({
    signal: controller.signal,
  })

  const textures = await fetch<Textures>(SKINS_URL.replace('%s', nickname))
  const url = textures.textures?.skin?.url
  if (!url) {
    throw new Error(`No skin found for name: \${nickname}`)
  }

  const blob = await fetch(url, { responseType: 'blob' })

  return new File([blob], `${textures.profileName}.png`)
}
