import type { components } from '~/api/modrinth.gen'
import { AvatarFallback, AvatarImage, AvatarRoot } from '@ark-ui/react'
import { clsx } from 'clsx/lite'

export interface ProjectIconProps {
  url: components['schemas']['Project']['icon_url']
  alt: string
}

export function ProjectIcon({ url, alt }: ProjectIconProps) {
  return (
    <AvatarRoot className="size-12 overflow-hidden rounded-sm">
      <AvatarFallback className="flex size-full items-center justify-center bg-zinc-600/50 text-zinc-400">
        <i className={clsx('fas fa-xl', url ? 'fa-spinner fa-spin-pulse' : 'fa-box')} />
      </AvatarFallback>

      <AvatarImage src={url ?? undefined} alt={alt} className="size-full object-contain" />
    </AvatarRoot>
  )
}
