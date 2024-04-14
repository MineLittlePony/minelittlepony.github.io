import { type GithubRelease, fetchUrl } from './github'

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

class Repo {
  constructor(
    private owner: string,
    private name: string,
  ) { }

  async releases(): Promise<Releases> {
    const [{ releases }, { release }] = await Promise.all([
      fetchUrl('/repos/{owner}/{name}/releases', { owner: this.owner, name: this.name }),
      fetchUrl('/repos/{owner}/{name}/releases/latest', { owner: this.owner, name: this.name }),
    ])

    const releaseInfo = this.compileReleaseInfo(release)
    const prerelease = releases
      .filter(value => value.prerelease)
      .map(this.compileReleaseInfo)
      .find(value => value.published_at > releaseInfo.published_at) ?? null

    return { release: releaseInfo, prerelease }
  }

  compileReleaseInfo = (release: GithubRelease): ReleaseInfo => {
    return {
      prerelease: release.prerelease,
      version: release.tag,
      mcVersion: parseMCVersion(release),
      published_at: new Date(release.publishedAt),
      url: `https://github.com/${this.owner}/${this.name}/releases/${release.tag}`,
    }
  }
}

export async function fetchReleases(owner: string, name: string): Promise<Releases> {
  return await new Repo(owner, name).releases()
}

function parseMCVersion(release: GithubRelease): string {
  const match = release.name?.match(/(.*) (.*) for Minecraft (.*)/)
  const result = match?.[3]

  return result ?? release.tag
}
