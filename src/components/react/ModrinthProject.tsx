import { useZodQuery } from '~/hooks/useZodQuery'
import { ProjectSchema } from '~/schemas/modrinth'
import { ModrinthCard } from './ModrinthCard'
import { ModrinthLink } from './ModrinthLink'

export interface ModrinthProjectProps {
  projectId: string
  title: string
  striped?: boolean
}

export function ModrinthProject({
  projectId,
  title,
  striped,
}: ModrinthProjectProps) {
  const { data } = useZodQuery(ProjectSchema, `https://api.modrinth.com/v2/project/${projectId}`)

  if (data) {
    return <ModrinthCard project={data} />
  }

  return <ModrinthLink projectId={projectId} title={title} striped={striped} />
}
