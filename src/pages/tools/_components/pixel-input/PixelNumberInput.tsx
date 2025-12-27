import type { PixelInputProps } from './PixelInput'
import { useAtomValue } from '@atomous/react'
import { NumberInput } from '~/components/ui/number-input'
import { normalizeColor } from '../../_context'
import { SettingsRowClassName } from '../SettingsRow'

export function PixelNumberInput({ pixel }: PixelInputProps) {
  const value = normalizeColor(useAtomValue(pixel.atom))

  return (
    <NumberInput
      className={SettingsRowClassName}
      label={pixel.info.name}
      min={0x000000}
      max={0xFFFFFF}
      step={1}
      value={value.toString()}
      onValueChange={({ valueAsNumber }) => pixel.atom.set(valueAsNumber)}
    />
  )
}
