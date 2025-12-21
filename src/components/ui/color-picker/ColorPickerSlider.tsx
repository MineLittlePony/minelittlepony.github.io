import type { ColorPickerChannelSliderProps } from '@ark-ui/react'
import { ColorPickerChannelSlider, ColorPickerChannelSliderThumb, ColorPickerChannelSliderTrack } from '@ark-ui/react'
import { clsx } from 'clsx/lite'
import { ColorPickerThumbClassName } from './classes'

export interface ColorPickerSliderProps {
  channel: ColorPickerChannelSliderProps['channel']
}

export function ColorPickerSlider(props: ColorPickerChannelSliderProps) {
  return (
    <ColorPickerChannelSlider className="grow" {...props}>
      <ColorPickerChannelSliderTrack className="h-6 rounded-sm" />
      <ColorPickerChannelSliderThumb className={clsx(ColorPickerThumbClassName, '-translate-1/2')} />
    </ColorPickerChannelSlider>
  )
}
