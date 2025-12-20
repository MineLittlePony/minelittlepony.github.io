import type { SelectRootProps } from '@ark-ui/react'
import type { ReactNode } from 'react'
import type { SelectValueDisplayProps } from './SelectValueDisplay'
import { SelectContent, SelectControl, SelectIndicator, SelectItem, SelectItemText, SelectLabel, SelectPositioner, SelectRoot, SelectTrigger } from '@ark-ui/react'
import { SelectValueDisplay } from './SelectValueDisplay'

export interface SelectProps<T> extends Omit<SelectRootProps<T>, 'children'> {
  label?: ReactNode
  placeholder?: string
  renderValue?: SelectValueDisplayProps<T>['render']
  renderItem?: (item: T) => ReactNode
}

export function Select<T>({ label, placeholder, positioning, renderValue, renderItem, ...props }: SelectProps<T>) {
  return (
    <SelectRoot positioning={{ sameWidth: true, ...positioning }} {...props}>
      {!!label && <SelectLabel>{label}</SelectLabel>}

      <SelectControl>
        <SelectTrigger className="input flex w-full grow items-center gap-2 text-start">
          <SelectValueDisplay placeholder={placeholder} render={renderValue} className="grow" />

          <SelectIndicator>
            <i className="fas fa-chevron-down" />
          </SelectIndicator>
        </SelectTrigger>
      </SelectControl>

      <SelectPositioner>
        <SelectContent className="z-10 flex max-h-(--available-height) flex-col gap-1 overflow-y-auto surface p-2 shadow-xl">
          {props.collection.items.map(item => (
            <SelectItem key={props.collection.getItemValue(item)} item={item} className="h-10 shrink-0 rounded-sm px-2 select-none hover:bg-zinc-200 data-[state=checked]:bg-primary data-[state=checked]:text-white">
              <SelectItemText className="flex h-full items-center gap-2">
                {renderItem?.(item) ?? props.collection.stringifyItem(item)}
              </SelectItemText>
            </SelectItem>
          ))}
        </SelectContent>
      </SelectPositioner>
    </SelectRoot>
  )
}
