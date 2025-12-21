import { ToolsUninitialized } from './ToolsUninitialized'

export function ToolsLoader() {
  return (
    <ToolsUninitialized>
      <i className="fas fa-spinner fa-spin-pulse text-6xl" />
      <noscript>Enable JavaScript in your browser to use this app</noscript>
    </ToolsUninitialized>
  )
}
