import type { PixelInputProps } from './PixelInput'
import { parseColor } from '@ark-ui/react'
import { useAtomValue } from '@atomous/react'
import { NumberInput } from '~/components/ui/number-input'
import { hex } from '~/utils/color'
import { SettingsRowClassName } from '../SettingsRow'

export function PixelNumberInput({ pixel }: PixelInputProps) {
  const color = useAtomValue(pixel.atom)
  const value = color.toHexInt()

  return (
    <NumberInput
      className={SettingsRowClassName}
      label={pixel.info.name}
      min={0x000000}
      max={0xFFFFFF}
      step={1}
      value={value.toString()}
      onValueChange={({ valueAsNumber }) => pixel.atom.set(parseColor(hex(valueAsNumber)))}
    />
  )
}
