export interface DownloadsHeadingProps {
  loading?: boolean
}

export function DownloadsHeading({ loading }: DownloadsHeadingProps) {
  return (
    <h2 className="space-x-2 text-center">
      <span>Download the mod</span>
      {loading && <i className="fas fa-spinner fa-spin-pulse" />}
    </h2>
  )
}
