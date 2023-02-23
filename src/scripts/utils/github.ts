import { Endpoints } from '@octokit/types'

type ReleasesReponse = Endpoints['GET /repos/{owner}/{repo}/releases']['response']['data']

export interface GitHubRepo {
  owner: string
  name: string
}

export interface ReleaseInfo {
  prerelease: boolean
  version: string
  mcVersion: string
  published_at: Date
  url: string
}

export interface Releases {
  release: ReleaseInfo | null
  prerelease: ReleaseInfo | null
}

export async function fetchReleases (owner: string, name: string): Promise<Releases> {
  const r = await fetch(`https://api.github.com/repos/${owner}/${name}/releases`, {
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  })

  const q = await fetch(`https://api.github.com/repos/${owner}/${name}/releases/latest`, {
     headers: {
       Accept: 'application/vnd.github.v3+json'
     }
  })

  const json = await r.json() as ReleasesReponse
  const latestJson = await q.json()

  let release = compileReleaseInfo(latestJson)
  let prerelease = json
     .filter(value => value.prerelease)
     .map(compileReleaseInfo)
     .filter(value => value.published_at > release.published_at)[0]

  return { release, prerelease }
}

function compileReleaseInfo (release: ReleasesReponse[number]): ReleaseInfo {
  return {
    prerelease: release.prerelease,
    version: release.tag_name,
    mcVersion: parseMCVersion(release),
    published_at: new Date(release.published_at),
    url: release.html_url
  }
}

function parseMCVersion (release: ReleasesReponse[number]): string {
  const match = release.name?.match(/(.*) (.*) for Minecraft (.*)/)
  const result = match?.[3]

  return result ?? release.target_commitish
}

function isEmpty (value: string | undefined): value is undefined {
  return value === undefined || value === ''
}

function parseProtocol (url: string): string {
  if (url.startsWith('https://github.com/')) {
    return url.replace('https://github.com/', '')
  }

  if (url.startsWith('git@github.com:')) {
    return url.replace('git@github.com:', '')
  }

  throw new Error(`Unsupported URL. Only SSH- and HTTPS-like GitHub URLs are supported (${url})`)
}

function normalizeName (name: string, type: string | undefined): string {
  return isEmpty(type) ? name.replace(/\.git$/, '') : name
}

export function parseGitHubUrl (url: string): GitHubRepo {
  const [owner, name, type] = parseProtocol(url).split('/')

  if (isEmpty(owner) || isEmpty(name)) {
    throw new Error(`GitHub URL must contain repo's owner and name (${url})`)
  }

  return {
    owner,
    name: normalizeName(name, type)
  }
}
