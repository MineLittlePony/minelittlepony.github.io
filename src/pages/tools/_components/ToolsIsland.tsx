import { useEffect, useState } from 'react'
import { ToolsApp } from './ToolsApp'
import { ToolsLoader } from './ToolsLoader'

export function ToolsIsland() {
  const [ready, setReady] = useState(false)

  // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks-extra/no-direct-set-state-in-use-effect
  useEffect(() => setReady(true), [])

  return ready ? <ToolsApp /> : <ToolsLoader />
}
