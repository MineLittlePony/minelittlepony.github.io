import { fetchReleases } from '@/scripts/utils/github'
import { Component, ComponentOptions } from '../Component'
import { GitHubLink } from './GitHubLink'

export class Downloads extends Component {
  public static readonly CLASS_NAME = 'downloads'

  private readonly mods = ["minelp", "hdskins"];

  constructor (options: ComponentOptions) {
    super(options);

    this.mods
      .map(this.getGithubLinkComponents)
      .forEach(async ([release, prerelease]) => {
        const {owner, name} = release;
        const releases = await fetchReleases(owner, name);
        if (releases.release !== null) {
          release.setReleaseInfo(releases.release);
        }

        if (prerelease && releases.prerelease !== null) {
          prerelease.setReleaseInfo(releases.prerelease);
        }
      });
  }

  getGithubLinkComponents = (name: string) => {
    const release = this.getComponent(`link--${name}`, GitHubLink)

    // prerelease might not exist
    let prerelease
    try {
      prerelease = this.getComponent(`link--${name}-pre`, GitHubLink)
    } catch {
      prerelease = null
    }

    return [release, prerelease] as const
  }
}
