import type { Atom } from 'atomous'
import type { ReactNode } from 'react'
import { useAtomValue } from '@atomous/react'

export interface WithAtomValueProps<T> {
  atom: Atom<T>
  children: (value: T, atom: Atom<T>) => ReactNode
}

export function WithAtomValue<T>({ atom, children }: WithAtomValueProps<T>) {
  return children(useAtomValue(atom), atom)
}
