import type { PixelInputProps } from './PixelInput'
import { useAtomValue } from '@atomous/react'
import { ColorPicker } from '~/components/ui/color-picker'
import { SettingsRowClassName } from '../SettingsRow'

export function PixelRawInput({ pixel }: PixelInputProps) {
  const value = useAtomValue(pixel.atom)

  return (
    <ColorPicker
      className={SettingsRowClassName}
      label={pixel.info.name}
      value={value}
      onValueChange={({ value }) => pixel.atom.set(value)}
    />
  )
}
