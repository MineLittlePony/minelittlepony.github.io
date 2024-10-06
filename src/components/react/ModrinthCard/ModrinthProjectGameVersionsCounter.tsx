import type { Version } from '~/schemas/modrinth';

export interface ModrinthProjectGameVersionsCounterProps {
  version: Version | undefined;
}

export function ModrinthProjectGameVersionsCounter({ version }: ModrinthProjectGameVersionsCounterProps) {
  if (!version || version.game_versions.length <= 1) {
    return null;
  }

  const counterDisplay = `+${version.game_versions.length - 1}`;

  return (
    <span
      className="rounded-full bg-white/15 px-2"
      title={version.game_versions.join(', ')}
    >
      {counterDisplay}
    </span>
  );
}
