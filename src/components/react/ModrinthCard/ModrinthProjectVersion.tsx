import type { Version } from '~/schemas/modrinth'

export interface ModrinthProjectVersionProps {
  projectId: string
  version: Version | undefined
}

export function ModrinthProjectVersion({ projectId, version }: ModrinthProjectVersionProps) {
  if (!version) {
    return <span>Unavailable</span>
  }

  const fullVersion = version.version_number
  const shortVersion = fullVersion.split('+')[0] ?? fullVersion

  return (
    <a
      className="underline"
      href={`https://modrinth.com/mod/${projectId}/version/${fullVersion}`}
      title="Go to version page"
    >
      v{shortVersion}
    </a>
  )
}
