import type { SelectValueTextProps } from '@ark-ui/react'
import type { ReactNode } from 'react'
import { SelectValueText, useSelectContext } from '@ark-ui/react'

export interface SelectValueDisplayProps<T> extends Omit<SelectValueTextProps, 'children'> {
  render?: (value: T[]) => ReactNode
}

export function SelectValueDisplay<T>({ render, ...props }: SelectValueDisplayProps<T>) {
  const value: T[] = useSelectContext().selectedItems

  return (
    <SelectValueText {...props}>
      {render?.(value)}
    </SelectValueText>
  )
}
