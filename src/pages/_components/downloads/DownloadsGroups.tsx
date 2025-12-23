import type { ReactNode } from 'react'
import type { DownloadsGroup, DownloadsProject } from './data'
import { Fragment } from 'react'

export interface DownloadsGroupsProps<TItem extends DownloadsProject> {
  groups: DownloadsGroup<TItem>[]
  renderItem: (item: TItem) => ReactNode
}

export function DownloadsGroups<TItem extends DownloadsProject>({ groups, renderItem }: DownloadsGroupsProps<TItem>) {
  return groups.map((group) => {
    return (
      <Fragment key={group.name}>
        <h2 className="text-center">{group.name}</h2>

        <div className="flex flex-col gap-2">
          {group.items.map((item) => {
            return (
              <Fragment key={item.id}>
                {renderItem(item)}
              </Fragment>
            )
          })}
        </div>
      </Fragment>
    )
  })
}
