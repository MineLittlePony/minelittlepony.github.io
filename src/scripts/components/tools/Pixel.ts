import { Component, type ComponentOptions, getComponent } from '../Component'
import { Select } from '../Select'
import { Color } from '@/scripts/Color'

export interface PixelEvents {
  change: {
    x: number
    y: number
    color: Color
  }
}

type ValueSetter = (value: Color) => void

export class Pixel extends Component<PixelEvents> {
  public static readonly CLASS_NAME = 'pixel'

  public readonly setValue: ValueSetter

  public readonly x: number
  public readonly y: number

  constructor(options: ComponentOptions) {
    super(options)

    this.x = Number.parseInt(this.root.dataset.x ?? '0')
    this.y = Number.parseInt(this.root.dataset.y ?? '0')

    const type = this.root.dataset.type

    switch (type) {
      case 'CONDENSED':
        this.setValue = this.initCondensed()
        break
      case 'NORMAL':
        this.setValue = this.initNormal()
        break
      case 'RAW':
        this.setValue = this.initRaw()
        break
      default:
        throw new Error(`Unknown pixel type '${String(type)}'`)
    }
  }

  private initCondensed(): ValueSetter {
    const select = getComponent(Select, this.root)

    select.on('change', (value) => {
      this.dispatchColor(Color.fromStringArray(value))
    })

    return (value) => {
      select.setValue([value.r.toString(), value.g.toString(), value.b.toString()])
    }
  }

  private initNormal(): ValueSetter {
    const select = getComponent(Select, this.root)

    select.on('input', (value) => {
      this.dispatchColor(Color.fromString(value))
    })

    return (value) => {
      select.setValue([value.toString()])
    }
  }

  private initRaw(): ValueSetter {
    const input = this.getElement('input', HTMLInputElement, true)

    input.addEventListener('input', () => {
      this.dispatchColor(Color.fromString(input.value.replace('#', '')))
    })

    return (value) => {
      input.value = `#${value.toString()}`
    }
  }

  private dispatchColor(color: Color): void {
    this.dispatch('change', { x: this.x, y: this.y, color })
  }
}
