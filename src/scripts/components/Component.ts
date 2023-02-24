import { ElementType, querySelector, querySelectorAll } from '@/scripts/utils/dom'
import { EventDispatcher } from '@keupoz/typed-event-dispatcher'

export interface ComponentOptions {
  root: HTMLElement
  rootName: string
}

export interface ComponentType<C extends Component> {
  CLASS_NAME: string

  new (options: ComponentOptions): C
}

export function getComponent<C extends Component> (type: ComponentType<C>, parent: ParentNode = document): C {
  const Component = type
  const root = querySelector(parent, `.${type.CLASS_NAME}`, HTMLElement, true)

  return new Component({ root, rootName: type.CLASS_NAME })
}

export function getComponents<C extends Component> (type: ComponentType<C>, parent: ParentNode = document): C[] {
  const Component = type
  const roots = querySelectorAll(parent, `.${type.CLASS_NAME}`, HTMLElement)

  return roots.map((root) => new Component({ root, rootName: type.CLASS_NAME }))
}

export abstract class Component<Events = any> extends EventDispatcher<Events> {
  protected readonly root: HTMLElement
  protected readonly rootName: string

  constructor (options: ComponentOptions) {
    super()

    this.root = options.root
    this.rootName = options.rootName
  }

  protected getRootAs<E extends Element>(type: ElementType<E>): E {
    if (this.root instanceof type) {
      return this.root
    }

    throw new Error(`Root is not ${type.name}`)
  }

  protected getComponent<C extends Component> (name: string, type: ComponentType<C>): C {
    const Component = type
    const root = this.getElement(name, HTMLElement, true)

    return new Component({ root, rootName: type.CLASS_NAME })
  }

  protected getComponents<C extends Component> (name: string, type: ComponentType<C>): C[] {
    const Component = type
    const roots = this.getElements(`.${name}`, HTMLElement)

    return roots.map((root) => new Component({ root, rootName: type.CLASS_NAME }))
  }

  protected getElement (name: string): Element | null
  protected getElement<E extends Element>(name: string, type: ElementType<E>, force: true): E
  protected getElement<E extends Element>(name: string, type: ElementType<E>, force?: boolean): E | null
  protected getElement<E extends Element>(name: string, type?: ElementType<E>, force = false): Element | null {
    if (type === undefined) {
      return querySelector(this.root, `.${this.rootName}__${name}`)
    } else {
      return querySelector(this.root, `.${this.rootName}__${name}`, type, force)
    }
  }

  protected getElements (name: string): Element[]
  protected getElements<E extends Element>(name: string, type: ElementType<E>): E[]
  protected getElements<E extends Element>(name: string, type?: ElementType<E>): Element[] {
    if (type === undefined) {
      return querySelectorAll(this.root, `.${this.rootName}__${name}`)
    }

    return querySelectorAll(this.root, `.${this.rootName}__${name}`, type)
  }

  protected closest (name: string, target: Element): Element | null
  protected closest<E extends Element>(name: string, target: Element, type: ElementType<E>): E | null
  protected closest<E extends Element>(name: string, target: Element, type?: ElementType<E>): Element | null {
    const element = target.closest(`.${this.rootName}__${name}`)

    if (type === undefined || element instanceof type) {
      return element
    }

    return null
  }
}
