import { ToolsUninitialized } from './ToolsUninitialized'

export function ToolsLoader() {
  return (
    <ToolsUninitialized>
      <i className="icon-[fa7-solid--spinner] animate-spin text-6xl" />
      <noscript>Enable JavaScript in your browser to use this app</noscript>
    </ToolsUninitialized>
  )
}
