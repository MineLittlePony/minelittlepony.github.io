import type { Project } from '~/schemas/modrinth'
import { UnoptimizedImage } from '../UnoptimizedImage'

export interface ModrinthProjectIconProps {
  url: Project['icon_url']
  alt: string
}

export function ModrinthProjectIcon({ url, alt }: ModrinthProjectIconProps) {
  if (!url) {
    return <div className="size-12 rounded bg-zinc-500" />
  }

  return (
    <UnoptimizedImage
      className="size-12 rounded"
      src={url}
      alt={alt}
      width={48}
      height={48}
    />
  )
}
