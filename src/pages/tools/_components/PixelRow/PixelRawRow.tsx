import type { Atom } from 'atomous'
import type { PixelInfo } from '~/data/pixels'
import { parseColor } from '@ark-ui/react'
import { useAtomValue } from '@atomous/react'
import { hex } from '~/utils/color'
import { colors2num } from '~/utils/colors2num'
import { ColorPicker } from '../ColorPicker/ColorPicker'

export interface PixelRawRowProps {
  info: PixelInfo
  atom: Atom<number | number[]>
}

export function PixelRawRow({ info, atom }: PixelRawRowProps) {
  const atomValue = useAtomValue(atom)
  const value = hex(colors2num(atomValue))

  return <ColorPicker label={info.name} value={parseColor(value)} onValueChange={e => atom.set(e.value.toHexInt())} />
}
