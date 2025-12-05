import { ToolsUninitialized } from './ToolsUninitialized'

export function ToolsLoader() {
  return (
    <ToolsUninitialized>
      <i className="fas fa-spinner fa-spin-pulse text-6xl" />
    </ToolsUninitialized>
  )
}
