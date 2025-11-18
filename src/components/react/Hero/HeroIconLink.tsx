import type { PropsWithChildren } from 'react'
import { clsx } from 'clsx'

export interface HeroIconLinkProps extends PropsWithChildren {
  href: string
  title: string
  icon?: string
}

export function HeroIconLink({
  href,
  title,
  icon,
  children,
}: HeroIconLinkProps) {
  return (
    <a href={href} title={title} className="opacity-50 hover:opacity-100">
      <span className="sr-only">{title}</span>
      {children ?? <i className={clsx(icon, 'fa-2xl')} />}
    </a>
  )
}
