import type { PixelValue } from '~/data/pixels'
import { createListCollection } from '@ark-ui/react'
import { useMemo } from 'react'
import { Select } from '~/components/ui/select'
import { SettingsRowClassName } from '../PixelRow/SettingsRow'
import { PixelLabel } from './PixelLabel'

export interface PixelSelectProps {
  label: string
  options: PixelValue[]
  value: number | number[]
  onChange: (value: number | number[]) => void
}

export function PixelSelect({ label, options, value, onChange }: PixelSelectProps) {
  const pixelValue = useMemo(() => {
    if (Array.isArray(value)) {
      const result: PixelValue[] = []

      for (const item of value) {
        const mappedItem = options.find(option => option.color === item)
        if (mappedItem) result.push(mappedItem)
      }

      return result
    }

    return options.filter(item => item.color === value)
  }, [options, value])

  const collection = createListCollection({
    items: options,
    itemToValue(item) {
      return item.color.toString()
    },
  })

  const multiple = Array.isArray(value)

  return (
    <Select
      className={SettingsRowClassName}
      label={label}
      collection={collection}
      value={pixelValue.map(item => item.color.toString())}
      multiple={multiple}
      onValueChange={(e) => {
        if (multiple) {
          onChange(e.items.slice(0, 3).map(item => item.color))
        } else {
          const value = e.items[0]
          if (value) onChange(value.color)
        }
      }}

      renderValue={value => <PixelLabel value={value} />}
      renderItem={item => <PixelLabel value={item} />}
    />
  )
}
