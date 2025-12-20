import type { ToggleGroupRootProps } from '@ark-ui/react'
import type { ReactNode } from 'react'
import { ToggleGroupItem, ToggleGroupRoot } from '@ark-ui/react'
import { clsx } from 'clsx'

export interface ToggleGroupValueItem<T extends string> {
  value: T
  label?: ReactNode
}

export interface ValueChangeDetails<T extends string> {
  value: T[]
}

export interface ToggleGroupProps<T extends string> extends Omit<ToggleGroupRootProps, 'value' | 'onValueChange' | 'children'> {
  items: ToggleGroupValueItem<T>[]
  value?: T[]
  onValueChange?: (details: ValueChangeDetails<T>) => void
}

export function ToggleGroup<T extends string>({ items, value, onValueChange, className, ...props }: ToggleGroupProps<T>) {
  return (
    <ToggleGroupRoot
      className={clsx('flex h-10 justify-between gap-1 surface p-1', className)}
      value={value}
      onValueChange={onValueChange as ToggleGroupRootProps['onValueChange']}
      {...props}
    >
      {items.map(item => (
        <ToggleGroupItem
          key={item.value}
          className="h-full grow rounded-sm hover:bg-zinc-200 data-[state=on]:bg-primary data-[state=on]:text-white"
          value={item.value}
        >
          {item.label ?? item.value}
        </ToggleGroupItem>
      ))}
    </ToggleGroupRoot>
  )
}
