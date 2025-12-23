import type { components } from '~/api/modrinth.gen'
import { clsx } from 'clsx/lite'
import prettyBytes from 'pretty-bytes'

const rootClassName = 'flex h-12 grow items-center justify-center gap-3 rounded-sm bg-white/5 sm:w-12 sm:grow-0 sm:bg-transparent'
const linkClassName = clsx(rootClassName, 'hover:bg-white/10 sm:hover:bg-white/5')

const NO_FILE_MESSAGE = 'No files avalable'

export interface ProjectFileLinkProps {
  version: components['schemas']['Version'] | undefined
}

export function ProjectFileLink({ version }: ProjectFileLinkProps) {
  if (!version) return null

  const file = version.files.find(file => file.primary) ?? version.files[0]

  if (!file) {
    return (
      <span className={rootClassName} title={NO_FILE_MESSAGE}>
        <i className="fas fa-ban fa-xl" />
        <span>{NO_FILE_MESSAGE}</span>
      </span>
    )
  }

  const fileSize = prettyBytes(file.size)
  const label = `Download (${fileSize})`

  return (
    <a href={file.url} title={label} className={linkClassName}>
      <i className="fas fa-download fa-xl" />
      <span className="sm:sr-only">{label}</span>
    </a>
  )
}
