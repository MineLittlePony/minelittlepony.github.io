import { Component } from './Component'

export class IconButton extends Component {
  public static readonly CLASS_NAME = 'icon-button'

  protected override readonly root = this.getRootAs(HTMLButtonElement)

  private readonly icon = this.getElement('icon', HTMLElement, true)

  public readonly addEventListener = this.root.addEventListener.bind(this.root)

  public click (): void {
    this.root.click()
  }

  public setIcon (prefix: string, name: string): void {
    this.icon.className = `${prefix} fa-${name}`
  }

  public spin (spin = true): void {
    this.icon.classList.toggle('fa-spin', spin)
  }

  public disable (disable = true): void {
    this.root.disabled = disable
  }
}
