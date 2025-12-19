import type { Atom } from 'atomous'
import type { PixelInfo } from '~/data/pixels'
import { useAtomValue } from '@atomous/react'
import { PixelSelect } from '../PixelSelect/PixelSelect'

export interface PixelSelectRowProps {
  info: PixelInfo
  atom: Atom<number | number[]>
}

export function PixelSelectRow({ info, atom }: PixelSelectRowProps) {
  const value = useAtomValue(atom)

  return (
    <PixelSelect
      label={info.name}
      options={info.options}
      value={value}
      onChange={atom.set}
    />
  )
}
