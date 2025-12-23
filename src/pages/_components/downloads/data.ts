export interface DownloadsProject {
  id: string
  name: string
}

export interface DownloadsGroup<TItem> {
  name: string
  items: TItem[]
}

export interface DownloadsConfig<TItem> {
  rootProject: DownloadsProject
  groups: DownloadsGroup<TItem>[]
}

function defineDownloads(config: DownloadsConfig<DownloadsProject | 'root'>): DownloadsConfig<DownloadsProject> {
  return {
    ...config,
    groups: config.groups.map((group) => {
      return {
        ...group,
        items: group.items.map((item) => {
          return item === 'root' ? config.rootProject : item
        }),
      }
    }),
  }
}

export const Downloads = defineDownloads({
  rootProject: { id: 'JBjInUXM', name: 'Mine Little Pony' },
  groups: [
    {
      name: 'Required mods',
      items: [
        'root',
        { id: 'P7dR8mSH', name: 'Fabric API' },
      ],
    },
    {
      name: 'Additional mods',
      items: [
        { id: 'FzE9gshV', name: 'HD Skins' },
        { id: 'h9pJxJR9', name: 'Big Pony' },
        { id: '9K7RJlvM', name: 'Unicopia' },
      ],
    },
  ],
})
