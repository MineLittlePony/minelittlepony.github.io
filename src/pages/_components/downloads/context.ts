import type { paths } from '~/api/modrinth.gen'
import { atom, computed, loadable } from 'atomous'
import { Fetcher } from 'openapi-typescript-fetch'
import { mapValues, objectify, unique } from 'radashi'
import { Downloads } from './data'

const fetcher = Fetcher.for<paths>()

fetcher.configure({
  baseUrl: 'https://api.modrinth.com/v2',
  init: {
    cache: 'force-cache',
  },
})

const RELEASE_REGEX = /^\d+\.\d+(?:\.\d+)?$/

function isRelease(version: string) {
  return RELEASE_REGEX.test(version)
}

const getProjects = fetcher.path('/projects').method('get').create()
const getProjectVersion = fetcher.path('/project/{id|slug}/version').method('get').create()

const ids = JSON.stringify(unique(Downloads.groups.map((group) => {
  return group.items.map(item => item.id)
}).flat()))

export const $context = loadable(computed(async (get, signal) => {
  const { data } = await getProjects({ ids }, { signal })

  const projectsDict = objectify(data, project => project.id)
  const rootProject = projectsDict[Downloads.rootProject.id]

  if (!rootProject) throw new Error('Failed to get root project data')

  const $selectedVersion = atom<string | null>(null)
  const $showAllVersions = atom(false)

  const $gameVersions = computed(() => {
    if (!rootProject.game_versions?.length) return []

    let result = rootProject.game_versions

    if ($showAllVersions.get()) {
      result = result.slice()
    } else {
      result = result.filter(isRelease)
    }

    return result.reverse()
  })

  const $currentVersion = computed(() => {
    return $selectedVersion.get() ?? $gameVersions.get()[0] ?? 'N/A'
  })

  const $gameVersionsParam = computed(() => {
    return JSON.stringify([$currentVersion.get()])
  })

  const projectsData = mapValues(projectsDict, (project) => {
    const $versions = loadable(computed(async (get, signal) => {
      const { data } = await getProjectVersion({
        'id|slug': project.id,
        'featured': true,
        'game_versions': get($gameVersionsParam),
      }, { signal })

      return data
    }))

    return { project, $versions }
  })

  const groups = Downloads.groups.map((group) => {
    return {
      ...group,
      items: group.items.map((item) => {
        const data = projectsData[item.id]

        if (!data) throw new Error(`Failed to get data for project "${item.name}"`)

        return {
          id: data.project.slug ?? data.project.id,
          name: data.project.title ?? item.name,
          ...data,
        }
      }),
    }
  })

  return {
    $selectedVersion,
    $showAllVersions,
    $currentVersion,
    $gameVersions,
    groups,
  }
}))
