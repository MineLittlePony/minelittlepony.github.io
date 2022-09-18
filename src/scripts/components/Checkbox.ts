import { Component, ComponentOptions } from './Component'

export interface CheckboxEvents {
  input: boolean
}

export class Checkbox extends Component<CheckboxEvents> {
  public static readonly CLASS_NAME = 'checkbox'

  private readonly input = this.getElement('input', HTMLInputElement, true)
  private readonly label = this.getElement('label', Element, true)

  constructor (options: ComponentOptions) {
    super(options)

    this.input.addEventListener('input', () => {
      this.dispatch('input', this.input.checked)
    })
  }

  public setChecked (checked: boolean): void {
    this.input.checked = checked
  }

  public disable (disabled = true): void {
    this.label.classList.toggle('disabled', disabled)
    this.input.disabled = disabled
  }
}
