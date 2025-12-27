import type { ReactNode } from 'react'
import { color2strings } from '~/utils/color'

export interface PixelLabelProps {
  label: ReactNode
  color: number
  partial?: boolean
}

export function PixelLabel({ label, color, partial }: PixelLabelProps) {
  const strings = color2strings(color, partial)

  return (
    <span className="flex grow items-center gap-2 text-start">
      <span
        className="block aspect-square w-4 shrink-0 rounded-xs border border-zinc-500/25 data-[transparent=true]:bg-checker-3"
        data-transparent={!color}
        style={{ backgroundColor: strings.hex }}
      />

      <span className="grow">{label || 'None selected'}</span>

      <code className="text-black! select-text">
        {strings.display}
      </code>
    </span>
  )
}
