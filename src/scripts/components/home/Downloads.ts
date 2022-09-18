import { fetchReleases } from '@/scripts/utils/github'
import { Component, ComponentOptions } from '../Component'
import { GitHubLink } from './GitHubLink'

export class Downloads extends Component {
  public static readonly CLASS_NAME = 'downloads'

  private readonly release = this.getComponent('link--release', GitHubLink)
  private readonly prerelease = this.getComponent('link--prerelease', GitHubLink)
  private readonly hdSkins = this.getComponent('link--hdskins', GitHubLink)

  constructor (options: ComponentOptions) {
    super(options)

    fetchReleases(this.release.getOwner(), this.release.getName()).then((releases) => {
      if (releases.release !== null) {
        this.release.setReleaseInfo(releases.release)
      }

      if (releases.prerelease !== null) {
        this.prerelease.setReleaseInfo(releases.prerelease)
      }
    })

    fetchReleases(this.hdSkins.getOwner(), this.hdSkins.getName()).then((releases) => {
      if (releases.release !== null) {
        this.hdSkins.setReleaseInfo(releases.release)
      }
    })
  }
}
