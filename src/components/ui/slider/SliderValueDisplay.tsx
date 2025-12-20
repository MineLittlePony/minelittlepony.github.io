import type { SliderValueTextProps } from '@ark-ui/react'
import type { ReactNode } from 'react'
import { SliderValueText, useSliderContext } from '@ark-ui/react'

export interface SliderValueDisplayProps extends SliderValueTextProps {
  render: (value: number[]) => ReactNode
}

export function SliderValueDisplay({ render, ...props }: SliderValueDisplayProps) {
  const { value } = useSliderContext()

  return (
    <SliderValueText {...props}>
      {render(value)}
    </SliderValueText>
  )
}
