import type { PixelValue } from '~/data/pixels'
import { Listbox, ListboxOption, ListboxOptions } from '@headlessui/react'
import { clsx } from 'clsx'
import { Fragment, useMemo } from 'react'
import { PixelLabel } from './PixelLabel'
import { PixelSelectButton } from './PixelSelectButton'

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

  function handleChange(value: number | number[]) {
    if (Array.isArray(value)) {
      value = value.slice(0, 3)
    }

    onChange(value)
  }

  return (
    <Listbox
      value={value}
      onChange={handleChange}
      multiple={Array.isArray(value)}
    >
      <div className="relative">
        <PixelSelectButton value={pixelValue} />

        <ListboxOptions className="absolute z-10 mt-2 w-full divide-y divide-zinc-500/25 overflow-hidden rounded-md border border-zinc-200 bg-white drop-shadow-md">
          {options.map(option => (
            <ListboxOption
              key={option.color}
              value={option.color}
              as={Fragment}
            >
              {({ selected }) => (
                <li
                  className={clsx(
                    'flex h-10 items-center gap-2 px-4 select-none hover:bg-primary hover:text-white',
                    {
                      'bg-primary text-white': selected,
                    },
                  )}
                >
                  <PixelLabel value={option} />
                </li>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}
