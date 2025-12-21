import type { ChangeEvent } from 'react'
import type { Project } from '~/pages/_components/modrinth/schemas'
import { useId, useState } from 'react'
import { useZodQuery } from '~/hooks/useZodQuery'
import { ProjectSchema } from '~/pages/_components/modrinth/schemas'
import { ModrinthProject } from './ModrinthProject'
import { VersionContext } from './VersionContext'

const RELEASE_REGEX = /^\d+\.\d+(?:\.\d+)?$/

function isRelease(version: string) {
  return RELEASE_REGEX.test(version)
}

function getVersions(data: Project, showAllVersions: boolean) {
  let result = data.game_versions

  if (showAllVersions) {
    result = result.slice()
  } else {
    result = result.filter(isRelease)
  }

  return result.reverse()
}

export function ModrinthDownloadsContent() {
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null)
  const [showAllVersions, setShowAllVersions] = useState(false)

  const versionsId = useId()
  const showAllVersionsId = useId()

  const { data } = useZodQuery(ProjectSchema, 'https://api.modrinth.com/v2/project/JBjInUXM')
  const versions = data && getVersions(data, showAllVersions)
  const version = selectedVersion ?? versions?.[0]

  function handleVersionChange(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.currentTarget.value

    setSelectedVersion(value === 'latest' ? null : value)
  }

  function handleFilterChange(e: ChangeEvent<HTMLInputElement>) {
    const newShowAllVersions = e.currentTarget.checked

    setShowAllVersions(newShowAllVersions)

    if (selectedVersion && !newShowAllVersions && !isRelease(selectedVersion)) {
      setSelectedVersion(null)
    }
  }

  return (
    <VersionContext value={version ?? null}>
      <h2 className="text-center">Get the mod</h2>

      {version && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <label className="select-none" htmlFor={versionsId}>
              Minecraft version:
            </label>

            <select
              className="rounded-sm bg-zinc-800 p-1 backdrop-blur-sm"
              id={versionsId}
              value={version}
              onChange={handleVersionChange}
            >
              <option>latest</option>

              {versions?.map(version => (
                <option key={version}>{version}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="select-none" htmlFor={showAllVersionsId}>
              Show all versions
            </label>

            <input
              id={showAllVersionsId}
              type="checkbox"
              checked={showAllVersions}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <ModrinthProject projectId="JBjInUXM" name="Mine Little Pony" />
        <ModrinthProject projectId="P7dR8mSH" name="Fabric API" />
      </div>

      <h2 className="text-center">Additional mods</h2>

      <div className="flex flex-col gap-2">
        <ModrinthProject projectId="FzE9gshV" name="HD Skins" />
        <ModrinthProject projectId="h9pJxJR9" name="Big Pony" />
        <ModrinthProject projectId="9K7RJlvM" name="Unicopia" />
      </div>
    </VersionContext>
  )
}
