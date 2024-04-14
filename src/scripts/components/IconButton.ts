import { Component } from './Component'

export class IconButton extends Component {
  public static readonly CLASS_NAME = 'icon-button'

  protected override readonly root = this.getRootAs(HTMLButtonElement)

  public readonly addEventListener = this.root.addEventListener.bind(this.root)

  public click(): void {
    this.root.click()
  }

  public disable(disable = true): void {
    this.root.disabled = disable
  }

  public hide(hide = true): void {
    this.root.hidden = hide
  }
}
