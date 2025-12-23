import type { LoadableState } from 'atomous'
import type { components } from '~/api/modrinth.gen'

export interface ProjectVersionProps {
  gameVersion: string
  projectId: string
  versionsState: LoadableState<components['schemas']['Version'][]>
}

export function ProjectVersion({ gameVersion, projectId, versionsState }: ProjectVersionProps) {
  if (versionsState.status === 'loading') return <span className="opacity-50">Loading ...</span>
  if (versionsState.status === 'error') return <span className="text-red-500">Failed to load versions</span>

  const version = versionsState.value[0]

  if (!version) return <span>Not available for {gameVersion}</span>

  const fullVersion = version.version_number
  const projectVersion = fullVersion?.split('+')[0]
  const versionDisplay = projectVersion ? `v${projectVersion}` : 'N/A'

  return (
    <div className="opacity-50">
      <a
        className="underline"
        href={`https://modrinth.com/mod/${projectId}/version/${fullVersion}`}
        title="Go to version page"
      >
        {versionDisplay}
      </a>

      {/* Spaces are required here */}
      <span> for {gameVersion} </span>

      {!!version.game_versions && version.game_versions.length > 1 && (
        <span
          className="rounded-full bg-white/15 px-2"
          title={version.game_versions.join(', ')}
        >
          +{version.game_versions.length - 1}
        </span>
      )}
    </div>
  )
}
