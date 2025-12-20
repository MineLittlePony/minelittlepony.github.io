import type { ColorPickerRootProps } from '@ark-ui/react'
import type { ReactNode } from 'react'
import { ColorPickerArea, ColorPickerAreaBackground, ColorPickerAreaThumb, ColorPickerChannelInput, ColorPickerContent, ColorPickerControl, ColorPickerEyeDropperTrigger, ColorPickerLabel, ColorPickerPositioner, ColorPickerRoot, ColorPickerTrigger, ColorPickerValueSwatch, ColorPickerView } from '@ark-ui/react'
import { ColorPickerThumbClassName } from './classes'
import { ColorPickerSlider } from './ColorPickerSlider'
import { ColorPickerSliderInput } from './ColorPickerSliderInput'

export interface ColorPickerProps extends Omit<ColorPickerRootProps, 'children'> {
  label?: ReactNode
}

export function ColorPicker({ label, ...props }: ColorPickerProps) {
  return (
    <ColorPickerRoot {...props}>
      {!!label && <ColorPickerLabel>{label}</ColorPickerLabel>}

      <ColorPickerControl className="flex gap-2">
        <ColorPickerChannelInput channel="hex" className="input grow" />

        <ColorPickerTrigger className="input p-2">
          <ColorPickerValueSwatch className="size-6" />
        </ColorPickerTrigger>
      </ColorPickerControl>

      <ColorPickerPositioner>
        <ColorPickerContent className="z-10 flex w-64 flex-col gap-2 surface p-2 shadow-xl">
          <ColorPickerArea>
            <ColorPickerAreaBackground className="aspect-square rounded-sm" />
            <ColorPickerAreaThumb className={ColorPickerThumbClassName} />
          </ColorPickerArea>

          <ColorPickerSlider channel="hue" />

          <ColorPickerView format="rgba" className="space-y-2">
            <ColorPickerSliderInput channel="red" />
            <ColorPickerSliderInput channel="green" />
            <ColorPickerSliderInput channel="blue" />
          </ColorPickerView>

          <ColorPickerEyeDropperTrigger className="btn flex items-center justify-center gap-2">
            <i className="fas fa-eye-dropper fa-sm" />
            <span>Pick color</span>
          </ColorPickerEyeDropperTrigger>
        </ColorPickerContent>
      </ColorPickerPositioner>
    </ColorPickerRoot>
  )
}
