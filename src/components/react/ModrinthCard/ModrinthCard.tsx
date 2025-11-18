import type { Project } from '~/schemas/modrinth'
import { clsx } from 'clsx'
import { useContext, useMemo } from 'react'
import { useZodQuery } from '~/hooks/useZodQuery'
import { VersionsSchema } from '~/schemas/modrinth'
import { buildURL } from '~/utils/buildURL'
import { VersionContext } from '../ModrinthDownloads/VersionContext'
import classes from './ModrinthCard.module.css'
import { ModrinthFileLink } from './ModrinthFileLink'
import { ModrinthProjectGameVersionsCounter } from './ModrinthProjectGameVersionsCounter'
import { ModrinthProjectIcon } from './ModrinthProjectIcon'
import { ModrinthProjectVersion } from './ModrinthProjectVersion'

export interface ModrinthCardProps {
  project: Project
}

export function ModrinthCard({ project }: ModrinthCardProps) {
  const gameVersion = useContext(VersionContext)

  const versionURL = useMemo(() => {
    const baseURL = `https://api.modrinth.com/v2/project/${project.id}/version`

    return buildURL(baseURL, {
      featured: true,
      game_versions: [gameVersion],
    })
  }, [gameVersion, project.id])

  const { data: versions } = useZodQuery(VersionsSchema, versionURL, !!gameVersion)

  const projectId = project.slug ?? project.id
  const version = versions?.[0]

  return (
    <div
      className={clsx(classes.Card, {
        [classes.Muted ?? '']: !version,
      })}
    >
      <div className="flex grow items-center gap-3">
        <ModrinthProjectIcon url={project.icon_url} alt={project.title ?? 'N/A'} />

        <div className="grow">
          <div className="flex items-baseline gap-2">
            <div className="h4 flex items-baseline gap-2">
              <a
                href={`https://modrinth.com/mod/${project.slug}`}
                title="Modrinth page"
                className="underline"
              >
                {project.title}
              </a>

              <i className="fas fa-arrow-up-right-from-square fa-xs opacity-50" />
            </div>

            {project.source_url && (
              <a
                href={project.source_url}
                className="opacity-50 hover:opacity-100"
                title="Source code"
              >
                <span className="sr-only">Go to source code</span>
                <i className="fas fa-code" />
              </a>
            )}
          </div>

          <div className="flex gap-2 opacity-50">
            <ModrinthProjectVersion projectId={projectId} version={version} />

            <span>for</span>
            <span>{gameVersion}</span>

            <ModrinthProjectGameVersionsCounter version={version} />
          </div>
        </div>
      </div>

      <ModrinthFileLink version={version} />
    </div>
  )
}
