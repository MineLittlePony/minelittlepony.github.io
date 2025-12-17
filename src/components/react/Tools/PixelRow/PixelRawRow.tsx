import type { Atom } from 'atomous'
import type { PixelInfo } from '~/data/pixels'
import { useAtomValue } from '@atomous/react'
import { hex } from '~/utils/color'
import { colors2num } from '~/utils/colors2num'
import { Input } from '../Input'
import { SettingsRow } from './SettingsRow'

export interface PixelRawRowProps {
  info: PixelInfo
  atom: Atom<number | number[]>
}

export function PixelRawRow({ info, atom }: PixelRawRowProps) {
  const atomValue = useAtomValue(atom)
  const value = hex(colors2num(atomValue))

  function handleChange(value: string) {
    const color = Number.parseInt(value.replace(/^#/, ''), 16)
    atom.set(color)
  }

  return (
    <SettingsRow label={info.name}>
      <Input type="color" value={value} onChange={handleChange} />
    </SettingsRow>
  )
}
