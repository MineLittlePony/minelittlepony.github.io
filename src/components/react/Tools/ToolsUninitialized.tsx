import type { HTMLAttributes } from 'react'
import clsx from 'clsx'
import { forwardRef } from 'react'

export const ToolsUninitialized = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({
  className,
  children,
  ...props
}, ref) => {
  return (
    <div className={clsx('flex aspect-video flex-col items-center justify-center gap-4 rounded-md bg-zinc-100 p-8 text-center text-zinc-500', className)} {...props} ref={ref}>
      {children}
    </div>
  )
})
