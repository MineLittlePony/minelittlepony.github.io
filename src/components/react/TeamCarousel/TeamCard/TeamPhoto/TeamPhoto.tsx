import type { TeamMember } from '~/data/team/team'
import { clsx } from 'clsx'
import { UnoptimizedImage } from '~/components/react/UnoptimizedImage'
import classes from './TeamPhoto.module.css'

export function TeamPhoto({ avatar, contacts, name }: TeamMember) {
  if (avatar) {
    return <img className={classes.Photo} src={avatar.src} alt={name} />
  }

  if (contacts?.github) {
    return (
      <UnoptimizedImage
        className={classes.Photo}
        src={`https://github.com/${contacts.github}.png`}
        alt={name}
        width={96}
        height={96}
      />
    )
  }

  return (
    <div
      className={clsx(
        classes.Photo,
        'flex items-center justify-center bg-zinc-200 text-white',
      )}
    >
      <i className="fas fa-user fa-2xl" />
    </div>
  )
}
