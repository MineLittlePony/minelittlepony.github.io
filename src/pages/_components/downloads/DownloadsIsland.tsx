import { ClientOnly } from '@ark-ui/react'
import { DownloadsApp } from './DownloadsApp'
import { DownloadsStatic } from './DownloadsStatic'

export const DownloadsIsland = ClientOnly.bind(null, {
  fallback: <DownloadsStatic />,
  children: <DownloadsApp />,
})
