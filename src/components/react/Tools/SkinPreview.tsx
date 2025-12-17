import { useEffect, useRef } from 'react'
import { useToolsContext } from './context'

export function SkinPreview() {
  const context = useToolsContext()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    return context.$output.subscribe((output) => {
      const ctx = canvasRef.current?.getContext('2d')

      if (!ctx) return

      ctx.canvas.width = output.width
      ctx.canvas.height = output.height

      ctx.drawImage(output, 0, 0)
    })
  }, [context.$output])

  return (
    <canvas
      className="w-full shadow-lg bg-checker-64"
      ref={canvasRef}
      width={64}
      height={32}
    />
  )
}
