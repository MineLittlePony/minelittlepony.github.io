import type { SliderRootProps } from '@ark-ui/react'
import type { ReactNode } from 'react'
import type { SliderValueDisplayProps } from './SliderValueDisplay'
import { SliderControl, SliderLabel, SliderRange, SliderRoot, SliderThumb, SliderTrack } from '@ark-ui/react'
import { useState } from 'react'
import { SliderValueDisplay } from './SliderValueDisplay'

export interface SliderProps extends SliderRootProps {
  label?: ReactNode
  renderValue?: SliderValueDisplayProps['render']
}

export function Slider({ label, children, renderValue, ...props }: SliderProps) {
  const [thumbIndices] = useState(() => {
    return (props.value ?? props.defaultValue)?.slice(0, 2).map((_, index) => index) ?? [0]
  })

  return (
    <SliderRoot {...props}>
      {!!label && <SliderLabel>{label}</SliderLabel>}

      <div>
        <div className="flex h-10 items-center gap-2">
          <SliderControl className="flex grow items-center">
            <SliderTrack className="h-2 grow rounded-full bg-zinc-400">
              <SliderRange className="h-full rounded-full bg-primary" />
            </SliderTrack>

            {thumbIndices.map(index => (
              <SliderThumb key={index} index={index} className="box-content size-3 rounded-full border-4 border-zinc-50 bg-primary shadow-md ring-1 shadow-zinc-700/25 ring-zinc-300" />
            ))}
          </SliderControl>

          {renderValue && <SliderValueDisplay render={renderValue} />}
        </div>

        {children}
      </div>
    </SliderRoot>
  )
}
