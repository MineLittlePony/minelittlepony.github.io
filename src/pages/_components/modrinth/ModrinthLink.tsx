export interface ModrinthLinkProps {
  projectId: string
  name: string
}

export function ModrinthLink({ projectId, name }: ModrinthLinkProps) {
  return (
    <a
      href={`https://modrinth.com/mod/${projectId}`}
      className="flex items-center justify-center gap-2 bg-white/80 p-3 text-center text-xl font-bold text-black first:border-t-5 first:border-stripe hover:bg-white sm:p-4 sm:text-2xl"
    >
      <span>Download {name}</span>
      <i className="fas fa-arrow-up-right-from-square fa-sm opacity-50" />
    </a>
  )
}
