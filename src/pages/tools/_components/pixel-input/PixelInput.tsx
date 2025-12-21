import type { ContextPixel } from '../../_context'
import { PixelCondensedInput } from './PixelCondensedInput'
import { PixelNormalInput } from './PixelNormalInput'
import { PixelNumberInput } from './PixelNumberInput'
import { PixelRawInput } from './PixelRawInput'

export interface PixelInputProps {
  pixel: ContextPixel
}

export function PixelInput({ pixel }: PixelInputProps) {
  switch (pixel.info.type) {
    case 'CONDENSED': return <PixelCondensedInput pixel={pixel} />
    case 'NORMAL': return <PixelNormalInput pixel={pixel} />
    case 'RAW': return <PixelRawInput pixel={pixel} />
    case 'NUMBER': return <PixelNumberInput pixel={pixel} />
  }
}
