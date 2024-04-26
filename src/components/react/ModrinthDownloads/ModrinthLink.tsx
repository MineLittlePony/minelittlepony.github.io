import { clsx } from 'clsx';

export interface ModrinthLinkProps {
  projectId: string;
  title: string;
  striped?: boolean | undefined;
}

export function ModrinthLink({ projectId, title, striped }: ModrinthLinkProps) {
  return (
    <a
      href={`https://modrinth.com/mod/${projectId}`}
      className={clsx(
        'flex items-center justify-center gap-2 bg-white/80 p-4 text-2xl font-bold text-black hover:bg-white',
        {
          'pastel-stripe': striped,
        },
      )}
    >
      <span>{`Download ${title}`}</span>

      <i className="fas fa-arrow-up-right-from-square fa-sm opacity-50" />
    </a>
  );
}
