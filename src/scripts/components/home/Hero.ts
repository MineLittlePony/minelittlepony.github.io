import { initKonami } from '@/scripts/konami'
import { Component, ComponentOptions, getComponent } from '../Component'
import { Downloads } from './Downloads'

export class Hero extends Component {
  public static readonly CLASS_NAME = 'hero'

  constructor (options: ComponentOptions) {
    super(options)

    initKonami(() => {
      this.root.classList.add('secret-solved')
    })

    getComponent(Downloads, this.root)
  }
}
