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
  const json = await r.json() as ReleasesReponse

  let release: ReleaseInfo | null = null
  let prerelease: ReleaseInfo | null = null

  for (const value of json) {
    if (value.prerelease && prerelease === undefined) {
      prerelease = compileReleaseInfo(value)

      continue
    } else {
      release = compileReleaseInfo(value)

      break
    }
  }

  return { release, prerelease }
}

function compileReleaseInfo (release: ReleasesReponse[number]): ReleaseInfo {
  return {
    prerelease: release.prerelease,
    version: release.tag_name,
    mcVersion: parseMCVersion(release),
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
