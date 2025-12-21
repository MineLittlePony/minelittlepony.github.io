import type { Color } from '@ark-ui/react'
import type { PixelInfo } from '~/data/pixels'

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

export interface PixelLabelProps {
  info: PixelInfo
  color: Color
  condensed?: boolean
}

export function PixelLabel({ info, color, condensed }: PixelLabelProps) {
  const hex = color.toString('hex')
  const label = computeLabel(info, color, condensed)

  return (
    <span
      className="flex grow items-center gap-2 text-start data-[empty=true]:opacity-50"
      data-empty={condensed && color.toHexInt() === 0}
    >
      <span
        className="block aspect-square w-4 shrink-0 rounded-xs border border-zinc-500/25"
        style={{ backgroundColor: hex }}
      />

      <span className="grow">{label}</span>

      <code className="text-black! select-text">
        {hex}
      </code>
    </span>
  )
}
