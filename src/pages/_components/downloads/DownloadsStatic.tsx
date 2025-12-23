import { Downloads } from './data'
import { DownloadsGroups } from './DownloadsGroups'
import { DownloadsHeading } from './DownloadsHeading'

export interface DownloadsStaticProps {
  loading?: boolean
}

export function DownloadsStatic({ loading }: DownloadsStaticProps) {
  return (
    <>
      <DownloadsHeading loading={loading} />

      <DownloadsGroups
        groups={Downloads.groups}
        renderItem={(item) => {
          return (
            <a
              href={`https://modrinth.com/mod/${item.id}`}
              className="flex items-center justify-center gap-2 bg-white/80 p-3 text-center text-xl font-bold text-black first:border-t-5 first:border-stripe hover:bg-white sm:p-4 sm:text-2xl"
            >
              <span>Download {item.name}</span>
              <i className="fas fa-arrow-up-right-from-square fa-sm opacity-50" />
            </a>
          )
        }}
      />
    </>
  )
}
