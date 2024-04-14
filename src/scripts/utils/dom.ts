export type ElementType<E extends Element> = new (...args: any[]) => E

export function querySelector(parent: ParentNode, selector: string): Element | null
export function querySelector<E extends Element>(parent: ParentNode, selector: string, type: ElementType<E>, force: true): E
export function querySelector<E extends Element>(parent: ParentNode, selector: string, type: ElementType<E>, force?: boolean): E | null
export function querySelector<E extends Element>(parent: ParentNode, selector: string, type?: ElementType<E>, force = false): Element | null {
  const element = parent.querySelector(selector)

  if (type === undefined) {
    return element
  }

  if (element instanceof type) {
    return element
  }

  if (force) {
    throw new Error(`Element '${selector}' is not ${type.name}`)
  }

  return null
}

export function querySelectorAll(parent: ParentNode, selector: string): Element[]
export function querySelectorAll<E extends Element>(parent: ParentNode, selector: string, type: ElementType<E>): E[]
export function querySelectorAll<E extends Element>(parent: ParentNode, selector: string, type?: ElementType<E>): Element[] {
  const elements = parent.querySelectorAll(selector)
  const result: Element[] = []

  if (type === undefined) {
    elements.forEach((element) => {
      result.push(element)
    })
  }
  else {
    elements.forEach((element) => {
      if (element instanceof type) {
        result.push(element)
      }
    })
  }

  return result
}
