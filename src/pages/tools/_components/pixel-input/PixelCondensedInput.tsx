import type { PixelInputProps } from './PixelInput'
import { useAtomValue } from '@atomous/react'
import { Select } from '~/components/ui/select'
import { int2rgb, rgb2int } from '~/utils/color'
import { normalizeColor } from '../../_context'
import { SettingsRowClassName } from '../SettingsRow'
import { createPixelCollection } from './createPixelCollection'
import { PixelLabel } from './PixelLabel'

export function PixelCondensedInput({ pixel }: PixelInputProps) {
  const color = normalizeColor(useAtomValue(pixel.atom))
  const collection = createPixelCollection(pixel.info.options)
  const value = int2rgb(color).map(channel => channel.toString())

  return (
    <Select
      className={SettingsRowClassName}
      label={pixel.info.name}
      collection={collection}
      value={value}
      multiple
      onValueChange={({ items }) => items.length <= 3 && pixel.atom.set(rgb2int(items.map(item => item.color)))}
      renderValue={items => <PixelLabel label={collection.stringifyItems(items) || (color && 'Unknown')} color={color} />}
      renderItem={item => <PixelLabel label={collection.stringifyItem(item)} color={item.color} partial />}
    />
  )
}
