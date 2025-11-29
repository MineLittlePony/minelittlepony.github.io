import type { PixelValue } from '~/data/pixels'
import { clsx } from 'clsx'
import { hex } from '~/utils/color'

function getPixelColor(value: PixelValue | PixelValue[]) {
  let colorNumber = 0

  if (Array.isArray(value)) {
    for (const item of value) {
      colorNumber = colorNumber << 8
      colorNumber += item.color
    }
  } else {
    colorNumber = value.color
  }

  return hex(colorNumber)
}

function getPixelLabel(value: PixelValue | PixelValue[]) {
  if (Array.isArray(value)) {
    if (value.length === 0) return 'None selected'
    return value.map(({ label }) => label).join(', ')
  }

  return value.label
}

export interface PixelLabelProps {
  value: PixelValue | PixelValue[]
}

export function PixelLabel({ value }: PixelLabelProps) {
  const color = getPixelColor(value)
  const label = getPixelLabel(value)

  return (
    <div
      className={clsx('flex grow items-center gap-2 text-start', {
        'opacity-50': Array.isArray(value) && value.length === 0,
      })}
    >
      <div
        className="aspect-square w-4 rounded-xs border border-zinc-500/25"
        style={{ backgroundColor: color }}
        title={color}
      />

      <span className="grow">{label}</span>

      <span className="select-text rounded-sm border bg-zinc-50 px-2 font-mono text-zinc-950">
        {color}
      </span>
    </div>
  )
}
