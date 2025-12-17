import type { Atom } from 'atomous'
import type { PixelInfo } from '~/data/pixels'
import { useAtomValue } from '@atomous/react'
import { PixelSelect } from '../PixelSelect/PixelSelect'
import { SettingsRow } from './SettingsRow'

export interface PixelSelectRowProps {
  info: PixelInfo
  atom: Atom<number | number[]>
}

export function PixelSelectRow({ info, atom }: PixelSelectRowProps) {
  const value = useAtomValue(atom)

  return (
    <SettingsRow label={info.name}>
      <PixelSelect
        options={info.options}
        value={value}
        onChange={atom.set}
      />
    </SettingsRow>
  )
}
