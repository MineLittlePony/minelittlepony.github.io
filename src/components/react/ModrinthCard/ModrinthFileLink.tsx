import prettyBytes from 'pretty-bytes';
import type { Version } from '~/schemas/modrinth';

export interface ModrinthFileLinkProps {
  version: Version | undefined;
}

export function ModrinthFileLink({ version }: ModrinthFileLinkProps) {
  if (!version) {
    return null;
  }

  const file = version.files.find(file => file.primary) ?? version.files[0];

  if (!file) {
    return null;
  }

  const fileSize = prettyBytes(file.size);
  const label = `Download (${fileSize})`;

  return (
    <a
      href={file.url}
      className="flex grow items-center justify-center gap-3 rounded bg-white/5 p-3 hover:bg-white/10 sm:grow-0 sm:bg-transparent sm:hover:bg-white/5"
      title={label}
    >
      <i className="fas fa-download text-2xl/6" />
      <span className="sm:sr-only">{label}</span>
    </a>
  );
}
