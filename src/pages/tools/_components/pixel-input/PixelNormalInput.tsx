import type { PixelInputProps } from './PixelInput'
import { useAtomValue } from '@atomous/react'
import { Select } from '~/components/ui/select'
import { normalizeColor } from '../../_context'
import { SettingsRowClassName } from '../SettingsRow'
import { createPixelCollection } from './createPixelCollection'
import { PixelLabel } from './PixelLabel'

export function PixelNormalInput({ pixel }: PixelInputProps) {
  const color = normalizeColor(useAtomValue(pixel.atom))
  const collection = createPixelCollection(pixel.info.options)
  const value = color.toString()

  return (
    <Select
      className={SettingsRowClassName}
      label={pixel.info.name}
      collection={collection}
      value={[value]}
      onValueChange={({ items }) => items[0] && pixel.atom.set(items[0].color)}
      renderValue={([item]) => <PixelLabel label={item ? collection.stringifyItem(item) : 'Unknown'} color={item?.color ?? color} />}
      renderItem={item => <PixelLabel label={collection.stringifyItem(item)} color={item.color} />}
    />
  )
}
