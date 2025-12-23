import { createIsland } from '~/components/Island'
import { DownloadsApp } from './DownloadsApp'
import { DownloadsStatic } from './DownloadsStatic'

export const DownloadsIsland = createIsland(DownloadsStatic, DownloadsApp)
