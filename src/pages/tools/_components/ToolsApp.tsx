import { useAtomValue } from '@atomous/react'
import { $contextState } from '../_context'
import { ToolsDropzone } from './ToolsDropzone'
import { ToolsLoader } from './ToolsLoader'
import { ToolsMain } from './ToolsMain'

export function ToolsApp() {
  const state = useAtomValue($contextState)

  // TODO do not replace the whole app if value is available
  if (state.status === 'loading') {
    return <ToolsLoader />
  }

  if (state.value) {
    return <ToolsMain />
  }

  return <ToolsDropzone />
}
