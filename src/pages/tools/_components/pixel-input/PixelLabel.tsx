import type { Color } from '@ark-ui/react'
import type { PixelInfo } from '~/data/pixels'
import { hex } from '~/utils/color'

function computeLabel(info: PixelInfo, color: Color, condensed?: boolean) {
  if (condensed) {
    color = color.toFormat('rgba')

    const values = [
      color.getChannelValue('red'),
      color.getChannelValue('green'),
      color.getChannelValue('blue'),
    ].filter(Boolean)

    if (!values.length) return 'None selected'

    return values.map(value => info.options.find(item => item.color === value)?.label).join(', ')
  }

  const hexInt = color.toHexInt()

  return info.options.find(item => item.color === hexInt)?.label
}

function computeStrings(color: Color, partial?: boolean) {
  if (!partial) {
    const hex = color.toString('hex')
    return { hex, display: hex }
  }

  const channelValue = color.toFormat('rgba').getChannelValue('blue')
  let hexInt = channelValue

  for (let i = 0; i < 3; i++) {
    hexInt = hexInt << 8 | channelValue
  }

  return {
    hex: hex(hexInt),
    display: hex(channelValue, 2),
  }
}

export interface PixelLabelProps {
  info: PixelInfo
  color: Color
  condensed?: boolean
  partial?: boolean
}

export function PixelLabel({ info, color, condensed, partial }: PixelLabelProps) {
  const label = computeLabel(info, color, condensed)
  const strings = computeStrings(color, partial)

  return (
    <span
      className="flex grow items-center gap-2 text-start data-[empty=true]:opacity-50"
      data-empty={condensed && color.toHexInt() === 0}
    >
      <span
        className="block aspect-square w-4 shrink-0 rounded-xs border border-zinc-500/25"
        style={{ backgroundColor: strings.hex }}
      />

      <span className="grow">{label}</span>

      <code className="text-black! select-text">
        {strings.display}
      </code>
    </span>
  )
}
