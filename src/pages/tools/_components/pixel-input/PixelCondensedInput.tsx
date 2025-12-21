import type { PixelInputProps } from './PixelInput'
import { parseColor } from '@ark-ui/react'
import { useAtomValue } from '@atomous/react'
import { Select } from '~/components/ui/select'
import { hex } from '~/utils/color'
import { SettingsRowClassName } from '../SettingsRow'
import { PixelLabel } from './PixelLabel'

function computeColor(items: { raw: number }[]) {
  const color = items.slice(0, 3).reduce((result, item) => {
    return (result << 8) + item.raw
  }, 0)

  return parseColor(hex(color))
}

export function PixelCondensedInput({ pixel }: PixelInputProps) {
  const color = useAtomValue(pixel.atom).toFormat('rgba')

  const value = [
    color.getChannelValue('red'),
    color.getChannelValue('green'),
    color.getChannelValue('blue'),
  ].reduce<string[]>((result, item) => {
    return item === 0 ? result : [...result, hex(item)]
  }, [])

  return (
    <Select
      className={SettingsRowClassName}
      label={pixel.info.name}
      collection={pixel.collection}
      value={value}
      multiple
      onValueChange={({ items }) => items.length <= 3 && pixel.atom.set(computeColor(items))}
      renderValue={items => <PixelLabel info={pixel.info} color={computeColor(items)} condensed />}
      renderItem={item => <PixelLabel info={pixel.info} color={item.color} />}
    />
  )
}
