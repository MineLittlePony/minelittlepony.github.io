import type { components } from '~/api/modrinth.gen'
import { UnoptimizedImage } from '~/components/UnoptimizedImage'

export interface ProjectIconProps {
  url: components['schemas']['Project']['icon_url']
  alt: string
}

export function ProjectIcon({ url, alt }: ProjectIconProps) {
  if (!url) return <div className="size-12 rounded-sm bg-zinc-500" />

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
