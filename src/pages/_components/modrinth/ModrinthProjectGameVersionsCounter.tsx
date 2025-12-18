import type { Version } from '~/pages/_components/modrinth/schemas'

export interface ModrinthProjectGameVersionsCounterProps {
  version: Version | undefined
}

export function ModrinthProjectGameVersionsCounter({ version }: ModrinthProjectGameVersionsCounterProps) {
  if (!version || version.game_versions.length <= 1) return null

  return (
    <span
      className="rounded-full bg-white/15 px-2"
      title={version.game_versions.join(', ')}
    >
      +{version.game_versions.length - 1}
    </span>
  )
}
