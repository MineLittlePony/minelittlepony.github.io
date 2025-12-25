import { ClientOnly } from '@ark-ui/react'
import { ToolsApp } from './ToolsApp'
import { ToolsLoader } from './ToolsLoader'

export const ToolsIsland = ClientOnly.bind(null, {
  fallback: <ToolsLoader />,
  children: <ToolsApp />,
})
