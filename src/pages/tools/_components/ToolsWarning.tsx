import type { PropsWithChildren } from 'react'

export function ToolsWarning({ children }: PropsWithChildren) {
  return (
    <div className="flex items-center gap-2 font-bold text-yellow-600">
      <i className="icon-[fa7-solid--triangle-exclamation]" />
      <span>{children}</span>
    </div>
  )
}
