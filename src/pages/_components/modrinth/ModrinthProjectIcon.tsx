import type { Project } from '~/pages/_components/modrinth/schemas'
import { UnoptimizedImage } from '~/components/UnoptimizedImage'

export interface ModrinthProjectIconProps {
  url: Project['icon_url']
  alt: string
}

export function ModrinthProjectIcon({ url, alt }: ModrinthProjectIconProps) {
  if (!url) {
    return <div className="size-12 rounded-sm bg-zinc-500" />
  }

  return (
    <UnoptimizedImage
      className="size-12 rounded-sm"
      src={url}
      alt={alt}
      width={48}
      height={48}
    />
  )
}
