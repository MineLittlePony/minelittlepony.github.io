import { Component, ComponentOptions } from './Component'

export interface SelectEvents {
  input: string
  change: string[]
}

document.addEventListener('click', () => {
  if (Select.lastOpen !== null) Select.lastOpen.close()
})

export class Select extends Component<SelectEvents> {
  public static readonly CLASS_NAME = 'select'

  static lastOpen: Select | null = null

  private readonly labelWrapper = this.getElement('label-wrapper', Element, true)
  private readonly label = this.getElement('label', HTMLElement, true)
  private readonly options = this.getElement('options', Element, true)

  private readonly optionsMap = new Map<HTMLElement, SelectOption>()
  private readonly selected = new Set<SelectOption>()

  private readonly max: number

  constructor (options: ComponentOptions) {
    super(options)

    const max = parseInt(this.root.dataset.max ?? '1')
    this.max = isNaN(max) ? 1 : max

    this.initOptions()

    this.labelWrapper.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()

      this.toggle()
    })

    this.options.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()

      if (!(e.target instanceof Element)) return

      const option = this.closest('option', e.target, HTMLElement)

      if (option === null) return

      this.toggleOption(option)
    })
  }

  public setValue (value: string[]): void {
    this.selected.clear()

    for (const [, option] of this.optionsMap) {
      const selected = value.includes(option.value)
      option.select(selected)

      if (selected) {
        this.selected.add(option)
      }
    }

    this.update()
  }

  public toggle (): void {
    if (this.root.classList.contains('is-open')) {
      this.close()
    } else {
      this.open()
    }
  }

  public close (): void {
    this.root.classList.remove('is-open')
    this.labelWrapper.classList.remove('focus')

    if (Select.lastOpen === this) Select.lastOpen = null
  }

  public open (): void {
    if (Select.lastOpen !== null) Select.lastOpen.close()

    this.root.classList.add('is-open')
    this.labelWrapper.classList.add('focus')
    Select.lastOpen = this

    const rootRect = this.root.getBoundingClientRect()
    const optionsRect = this.options.getBoundingClientRect()
    const pageOffset = window.scrollY + rootRect.top

    // Compute the total height because the browser can't do that
    const height = optionsRect.bottom - rootRect.top

    // Reverse the options if they can't fit into the viewport
    if (document.body.offsetHeight < pageOffset + height) {
      this.root.classList.add('is-reversed')
    }

    let clientOffset = 0

    // Scroll to the center of the component if the viewport is long enough
    if (window.innerHeight > height) {
      clientOffset = (window.innerHeight - height) / 2
    }

    // Scroll the component into the view
    // `scrollIntoView` doesn't provide the same behaviour
    window.scrollTo({
      behavior: 'smooth',
      top: pageOffset - clientOffset
    })
  }

  private initOptions (): void {
    for (const element of this.getElements('option', HTMLElement)) {
      const option = new SelectOption(element)

      this.optionsMap.set(option.element, option)

      if (option.isSelected()) {
        if (this.max >= this.selected.size) {
          option.select(false)
        } else {
          this.selected.add(option)
        }
      }
    }

    this.update()
  }

  private toggleOption (element: HTMLElement): void {
    const option = this.optionsMap.get(element)

    if (option === undefined) return

    if (this.max === 1) {
      if (!option.isSelected()) {
        this.setValue([option.value])
      }
    } else {
      if (option.isSelected()) {
        this.deselect(option)
      } else {
        this.select(option)
      }
    }

    const values: string[] = []

    for (const option of this.selected) {
      values.push(option.value)
    }

    this.update()
    this.dispatch('input', option.isSelected() ? option.value : '')
    this.dispatch('change', values)
  }

  private select (option: SelectOption): void {
    if (this.selected.size >= this.max) return

    option.select()
    this.selected.add(option)
  }

  private deselect (option: SelectOption): void {
    option.select(false)
    this.selected.delete(option)
  }

  private update (): void {
    if (this.selected.size === 0) {
      this.label.innerText = 'None selected'
    } else {
      const labels: string[] = []

      for (const option of this.selected) {
        labels.push(option.label)
      }

      this.label.innerText = labels.join(', ')
    }
  }
}

class SelectOption {
  private selected: boolean

  public readonly element: HTMLElement
  public readonly value: string
  public readonly label: string

  constructor (element: HTMLElement) {
    this.element = element
    this.value = SelectOption.getValue(element)
    this.label = element.innerText
    this.selected = element.classList.contains('is-selected')
  }

  public static getValue (element: HTMLElement): string {
    return element.dataset.value ?? element.innerText
  }

  public isSelected (): boolean {
    return this.selected
  }

  public select (select = true): void {
    this.element.classList.toggle('is-selected', select)
    this.selected = select
  }
}
