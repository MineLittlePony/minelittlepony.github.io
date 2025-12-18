import type { PixelValue } from '~/data/pixels'
import { createListCollection, Select } from '@ark-ui/react'
import { useMemo } from 'react'
import { PixelLabel } from './PixelLabel'

export interface PixelSelectProps {
  options: PixelValue[]
  value: number | number[]
  onChange: (value: number | number[]) => void
}

export function PixelSelect({ options, value, onChange }: PixelSelectProps) {
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
    <Select.Root
      collection={collection}
      value={pixelValue.map(item => item.color.toString())}
      positioning={{ sameWidth: true }}
      multiple={multiple}
      onValueChange={(e) => {
        if (multiple) {
          onChange(e.items.slice(0, 3).map(item => item.color))
        } else {
          const value = e.items[0]
          if (value) onChange(value.color)
        }
      }}
    >
      <Select.Control>
        <Select.Trigger className="input flex w-full grow items-center gap-2 text-start">
          <Select.ValueText placeholder="None selected" className="grow">
            <PixelLabel value={pixelValue} />
          </Select.ValueText>

          <Select.Indicator>
            <i className="fas fa-chevron-down" />
          </Select.Indicator>
        </Select.Trigger>
      </Select.Control>

      <Select.Positioner>
        <Select.Content className="z-10 flex max-h-(--available-height) flex-col gap-1 overflow-y-auto rounded-md border border-zinc-200 bg-white p-2 shadow-xl">
          {collection.items.map(item => (
            <Select.Item key={item.color} item={item} className="h-10 shrink-0 rounded-sm px-2 select-none hover:bg-zinc-200 data-[state=checked]:bg-primary data-[state=checked]:text-white">
              <Select.ItemText className="flex h-full items-center gap-2">
                <PixelLabel value={item} />
              </Select.ItemText>
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  )
}
