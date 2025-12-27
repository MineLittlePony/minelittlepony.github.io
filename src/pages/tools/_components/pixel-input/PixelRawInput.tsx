import type { PixelInputProps } from './PixelInput'
import { parseColor } from '@ark-ui/react'
import { useAtomValue } from '@atomous/react'
import { ColorPicker } from '~/components/ui/color-picker'
import { int2hex } from '~/utils/color'
import { SettingsRowClassName } from '../SettingsRow'

export function PixelRawInput({ pixel }: PixelInputProps) {
  const color = useAtomValue(pixel.atom)
  const value = typeof color === 'number' ? parseColor(int2hex(color)) : color

  return (
    <ColorPicker
      className={SettingsRowClassName}
      label={pixel.info.name}
      value={value}
      onValueChange={({ value }) => pixel.atom.set(value)}
    />
  )
}
