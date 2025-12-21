import type { PixelInputProps } from './PixelInput'
import { useAtomValue } from '@atomous/react'
import { Select } from '~/components/ui/select'
import { SettingsRowClassName } from '../SettingsRow'
import { PixelLabel } from './PixelLabel'

export function PixelNormalInput({ pixel }: PixelInputProps) {
  const value = useAtomValue(pixel.atom)

  return (
    <Select
      className={SettingsRowClassName}
      label={pixel.info.name}
      collection={pixel.collection}
      value={[value.toString('hex')]}
      onValueChange={({ items }) => items[0] && pixel.atom.set(items[0].color)}
      renderValue={([item]) => item && <PixelLabel info={pixel.info} color={item.color} />}
      renderItem={item => <PixelLabel info={pixel.info} color={item.color} />}
    />
  )
}
