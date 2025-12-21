import type { TeamMember } from '~/data/team/team'
import { clsx } from 'clsx/lite'
import { UnoptimizedImage } from '~/components/UnoptimizedImage'

const photoClassName = 'size-24 rounded-full'

export function TeamPhoto({ avatar, contacts, name }: TeamMember) {
  if (avatar) {
    return <img className={photoClassName} src={avatar.src} alt={name} />
  }

  if (contacts?.github) {
    return (
      <UnoptimizedImage
        className={photoClassName}
        src={`https://github.com/${contacts.github}.png`}
        alt={name}
        width={96}
        height={96}
      />
    )
  }

  return (
    <div className={clsx(photoClassName, 'flex items-center justify-center bg-zinc-200 text-white')}>
      <i className="fas fa-user fa-2xl" />
    </div>
  )
}
