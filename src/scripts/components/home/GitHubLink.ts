import type { ReleaseInfo } from '@/scripts/utils/releases'
import { Component } from '../Component'

export class GitHubLink extends Component {
  public static readonly CLASS_NAME = 'github-link'

  public get owner (): string {
    const owner = this.root.dataset.owner

    if (owner === undefined) {
      throw new Error('The data-owner attribute must be set')
    }

    return owner
  }

  public get name (): string {
    const name = this.root.dataset.name

    if (name === undefined) {
      throw new Error('The data-name attribute must be set')
    }

    return name
  }

  public setReleaseInfo (info: ReleaseInfo): void {
    (this.root as HTMLAnchorElement).href = info.url
    this.root.dataset.mc = info.mcVersion
    this.root.dataset.version = info.version

    this.root.classList.remove('is-hidden')
  }
}
