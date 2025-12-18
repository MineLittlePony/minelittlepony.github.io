import { useAtomValue } from '@atomous/react'
import { $contextState } from '../_context'

export function ToolsError() {
  const { error } = useAtomValue($contextState)

  if (!error) return null

  const message = error instanceof Error ? error.message : String(error)

  return (
    <div className="flex items-center gap-2 font-bold text-red-500">
      <i className="fas fa-triangle-exclamation" />
      <span>{message}</span>
    </div>
  )
}
