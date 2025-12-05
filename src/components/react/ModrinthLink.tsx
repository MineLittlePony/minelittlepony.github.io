import { clsx } from 'clsx'

export interface ModrinthLinkProps {
  projectId: string
  title: string
  striped?: boolean | undefined
}

export function ModrinthLink({ projectId, title, striped }: ModrinthLinkProps) {
  return (
    <a
      href={`https://modrinth.com/mod/${projectId}`}
      className={clsx(
        'flex items-center justify-center gap-2 bg-white/80 p-3 text-center text-xl font-bold text-black hover:bg-white sm:p-4 sm:text-2xl',
        {
          'border-t-5 border-stripe': striped,
        },
      )}
    >
      <span>{`Download ${title}`}</span>

      <i className="fas fa-arrow-up-right-from-square fa-sm opacity-50" />
    </a>
  )
}
