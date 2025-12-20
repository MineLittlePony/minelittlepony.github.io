import type { ColorPickerChannelSliderProps } from '@ark-ui/react'
import { ColorPickerChannelInput } from '@ark-ui/react'
import { useId } from 'react'
import { ColorPickerSlider } from './ColorPickerSlider'

export interface ColorPickerSliderInputProps {
  channel: ColorPickerChannelSliderProps['channel']
}

export function ColorPickerSliderInput({ channel }: ColorPickerSliderInputProps) {
  const id = useId()

  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="mr-2">{channel[0]?.toUpperCase()}</label>
      <ColorPickerSlider channel={channel} />
      <ColorPickerChannelInput channel={channel} id={id} className="input h-6 px-1" />
    </div>
  )
}
