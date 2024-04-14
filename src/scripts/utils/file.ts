import { removeICC } from './icc'

const SKINS_URL = 'https://minelp.deno.dev/skin/exact/valhalla/%s'

let controller: AbortController | null = null

export async function fetchSkin(nickname: string): Promise<File> {
  if (controller !== null) {
    controller.abort()
  }

  controller = new AbortController()

  const r = await fetch(SKINS_URL.replace('%s', nickname), { signal: controller.signal })

  if (!r.ok) {
    const json = await r.json()

    throw new Error(json.error)
  }

  const blob = await r.blob()
  const xNickname = r.headers.get('X-Nickname') ?? nickname

  return new File([blob], `${xNickname}.png`)
}

export async function file2image(file: File): Promise<HTMLImageElement> {
  const blob = await readPNG(file)

  return await new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob)
    const img = new Image()

    img.onload = () => {
      resolve(img)
      URL.revokeObjectURL(url)
    }

    img.onerror = (_e, err) => {
      reject(err)
    }

    img.src = url
  })
}

async function readPNG(file: File): Promise<Blob> {
  return await new Promise((resolve, reject) => {
    const F = new FileReader()

    F.onload = () => {
      try {
        if (!(F.result instanceof ArrayBuffer)) {
          throw new TypeError('FileReader result is not ArrayBuffer')
        }

        const clean = removeICC(F.result)

        if (clean === null) {
          throw new Error('File is not PNG')
        }

        const blob = new Blob([clean], {
          type: 'image/png',
        })

        resolve(blob)
      }
      catch (err) {
        reject(err)
      }
    }

    F.onerror = () => {
      reject(F.error)
    }

    F.readAsArrayBuffer(file)
  })
}
