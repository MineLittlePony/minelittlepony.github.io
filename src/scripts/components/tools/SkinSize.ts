import { floorPowerOfTwo, getMultiplier } from '@/scripts/utils/math'
import { Component, ComponentOptions } from '../Component'

export interface SkinSizeEvents {
  input: number
}

function calcShift (size: number): number {
  size = floorPowerOfTwo(size)

  return getMultiplier(size)
}

export class SkinSize extends Component<SkinSizeEvents> {
  public static readonly CLASS_NAME = 'skin-size'

  private readonly input = this.getElement('input', HTMLInputElement, true)

  constructor (options: ComponentOptions) {
    super(options)

    this.input.addEventListener('input', () => {
      this.dispatch('input', parseInt(this.input.value))
    })
  }

  public setMaxSize (size: number): void {
    this.input.max = calcShift(size).toString()
  }

  public setSize (size: number): void {
    this.input.value = calcShift(size).toString()
  }
}
