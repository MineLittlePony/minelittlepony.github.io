import type { LoadableAtom } from 'atomous'
import type { components } from '~/api/modrinth.gen'
import { useAtomValue } from '@atomous/react'
import { ProjectFileLink } from './ProjectFileLink'
import { ProjectIcon } from './ProjectIcon'
import { ProjectVersion } from './ProjectVersion'

export interface ProjectCardProps {
  gameVersion: string
  projectId: string
  name: string
  project: components['schemas']['Project']
  versionsAtom: LoadableAtom<components['schemas']['Version'][]>
}

export function ProjectCard({ gameVersion, projectId, name, project, versionsAtom }: ProjectCardProps) {
  const versionsState = useAtomValue(versionsAtom)

  return (
    <div
      className="flex flex-col gap-3 rounded-sm bg-white/5 p-2 backdrop-blur-sm data-[no-version=true]:not-hover:opacity-25 sm:flex-row sm:items-center"
      data-no-version={!versionsState.value?.[0]}
    >
      <div className="flex grow items-center gap-3">
        <ProjectIcon url={project.icon_url} alt={name} />

        <div className="grow">
          <div className="flex items-baseline gap-2">
            <div className="flex items-baseline gap-2 text-xl font-bold">
              <a
                href={`https://modrinth.com/mod/${projectId}`}
                title="Modrinth page"
                className="underline"
              >
                {name}
              </a>

              <i className="fas fa-arrow-up-right-from-square fa-xs opacity-50" />
            </div>

            {project.source_url && (
              <a
                href={project.source_url}
                className="not-hover:opacity-50"
                title="Source code"
              >
                <span className="sr-only">Go to source code</span>
                <i className="fas fa-code" />
              </a>
            )}
          </div>

          <ProjectVersion gameVersion={gameVersion} projectId={projectId} versionsState={versionsState} />
        </div>
      </div>

      <ProjectFileLink version={versionsState.value?.[0]} />
    </div>
  )
}
