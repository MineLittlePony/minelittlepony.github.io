import { createIsland } from '~/components/Island'
import { ToolsApp } from './ToolsApp'
import { ToolsLoader } from './ToolsLoader'

export const ToolsIsland = createIsland(ToolsLoader, ToolsApp)
