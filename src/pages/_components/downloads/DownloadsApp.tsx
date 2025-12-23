import { useAtomValue } from '@atomous/react'
import { batch } from 'atomous'
import { useId } from 'react'
import { WithAtomValue } from '~/components/WithAtomValue'
import { $context } from './context'
import { DownloadsGroups } from './DownloadsGroups'
import { DownloadsHeading } from './DownloadsHeading'
import { DownloadsStatic } from './DownloadsStatic'
import { ProjectCard } from './project/ProjectCard'

export function DownloadsApp() {
  const { status, value: context } = useAtomValue($context)

  const versionsId = useId()
  const showAllVersionsId = useId()

  if (!context) return <DownloadsStatic loading={status === 'loading'} />

  return (
    <>
      <DownloadsHeading />

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <label className="select-none" htmlFor={versionsId}>
            Minecraft version:
          </label>

          <WithAtomValue atom={context.$currentVersion}>{value => (
            <select
              className="rounded-sm bg-zinc-800 p-1 backdrop-blur-sm"
              id={versionsId}
              value={value}
              onChange={(e) => {
                const value = e.currentTarget.value
                context.$selectedVersion.set(value === 'latest' ? null : value)
              }}
            >
              <option>latest</option>

              <WithAtomValue atom={context.$gameVersions}>{value => value.map(item => (
                <option key={item}>{item}</option>
              )) }
              </WithAtomValue>

            </select>
          )}
          </WithAtomValue>

        </div>

        <div className="flex items-center gap-2">
          <label className="select-none" htmlFor={showAllVersionsId}>
            Show all versions
          </label>

          <WithAtomValue atom={context.$showAllVersions}>{value => (
            <input
              id={showAllVersionsId}
              type="checkbox"
              checked={value}
              onChange={(e) => {
                batch(() => {
                  const value = e.currentTarget.checked

                  context.$showAllVersions.set(value)
                  context.$selectedVersion.set(null)
                })
              }}
            />
          )}
          </WithAtomValue>
        </div>
      </div>

      <WithAtomValue atom={context.$currentVersion}>
        {gameVersion => (
          <DownloadsGroups
            groups={context.groups}
            renderItem={(item) => {
              return (
                <ProjectCard
                  gameVersion={gameVersion}
                  projectId={item.id}
                  name={item.name}
                  project={item.project}
                  versionsAtom={item.$versions}
                />
              )
            }}
          >
          </DownloadsGroups>
        )}
      </WithAtomValue>
    </>
  )
}
