import type { Atom } from 'atomous'
import type { PixelInfo } from '~/data/pixels'
import { PixelRawRow } from './PixelRawRow'
import { PixelSelectRow } from './PixelSelectRow'

export interface PixelRowProps {
  info: PixelInfo
  atom: Atom<number | number[]>
}

export function PixelRow({ info, atom }: PixelRowProps) {
  if (info.type === 'RAW') {
    return <PixelRawRow info={info} atom={atom} />
  }

  return <PixelSelectRow info={info} atom={atom} />
}
