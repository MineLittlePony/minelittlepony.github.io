import type { ElementType } from 'react'
import { useEffect, useState } from 'react'

export function createIsland(StaticComponent: ElementType, ClientComponent: ElementType) {
  return function Island() {
    const [ready, setReady] = useState(false)

    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    useEffect(() => setReady(true), [])

    return ready ? <ClientComponent /> : <StaticComponent />
  }
}
