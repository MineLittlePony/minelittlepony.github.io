import type { HTMLAttributes, Ref } from 'react'
import clsx from 'clsx'

export interface ToolsUninitializedProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>
}

export function ToolsUninitialized({ className, children, ref, ...props }: ToolsUninitializedProps) {
  return (
    <div className={clsx('flex aspect-video flex-col items-center justify-center gap-4 rounded-md bg-zinc-100 p-8 text-center text-zinc-500', className)} {...props} ref={ref}>
      {children}
    </div>
  )
}
