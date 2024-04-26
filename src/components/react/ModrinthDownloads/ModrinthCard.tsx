import { clsx } from 'clsx';
import prettyBytes from 'pretty-bytes';
import { useContext, useMemo } from 'react';

import { UnoptimizedImage } from '@/components/react/UnoptimizedImage';
import { useZodQuery } from '@/hooks/useZodQuery';
import { type Project, ProjectVersionsSchema } from '@/schemas/modrinth';
import { buildURL } from '@/utils/buildURL';

import { VersionContext } from './VersionContext';

export interface ModrinthCardProps {
  project: Project;
}

export function ModrinthCard({ project }: ModrinthCardProps) {
  const gameVersion = useContext(VersionContext);

  const versionURL = useMemo(() => {
    const baseURL = `https://api.modrinth.com/v2/project/${project.id}/version`;

    return buildURL(baseURL, {
      featured: true,
      game_versions: [gameVersion],
    });
  }, [gameVersion, project.id]);

  const { data: versions } = useZodQuery(ProjectVersionsSchema, versionURL, !!gameVersion);

  const version = versions?.[0];
  const versionNumber = version?.version_number;
  const versionString = versionNumber?.split('+')[0] ?? versionNumber;
  const file = version?.files.find(file => file.primary) ?? version?.files[0];

  return (
    <div
      className={clsx(
        'flex items-center gap-3 rounded bg-white/5 p-2 backdrop-blur',
        {
          'opacity-25 hover:opacity-100': !version,
        },
      )}
    >
      {project.icon_url
        ? (
          <UnoptimizedImage
            className="size-12 rounded"
            src={project.icon_url}
            alt={project.title ?? 'N/A'}
            width={48}
            height={48}
          />
          )
        : (
          <div className="size-12 rounded bg-zinc-500" />
          )}

      <div className="grow">
        <div className="flex items-baseline gap-2">
          <div className="h4 flex items-baseline gap-2">
            <a
              href={`https://modrinth.com/mod/${project.slug}`}
              title="Modrinth page"
              className="underline"
            >
              {project.title}
            </a>

            <i className="fas fa-arrow-up-right-from-square fa-xs opacity-50" />
          </div>

          {project.source_url && (
            <a
              href={project.source_url}
              className="opacity-50 hover:opacity-100"
              title="Source code"
            >
              <span className="sr-only">Go to source code</span>
              <i className="fas fa-code" />
            </a>
          )}

          {versionString && (
            <a
              className="underline opacity-50"
              href={`https://modrinth.com/mod/${project.slug}/version/${version?.version_number}`}
              title="Go to version page"
            >
              v
              {versionString}
            </a>
          )}
        </div>

        <div className="flex gap-2 opacity-50">
          {version
            ? (
              <>
                <span>
                  Minecraft
                  {gameVersion}
                </span>

                {!version.game_versions
                || version.game_versions.length <= 1
                  ? null
                  : (
                    <span
                      className="rounded-full bg-white/15 px-2"
                      title={version.game_versions.join(', ')}
                    >
                      +
                      {version.game_versions.length - 1}
                    </span>
                    )}

                <span>&bull;</span>
                <span>{file ? prettyBytes(file.size) : 'N/A'}</span>
              </>
              )
            : (
              <span>
                Unavailable for
                {gameVersion}
              </span>
              )}
        </div>
      </div>

      <div className="flex gap-2">
        {file && (
          <a
            href={file.url}
            className="rounded p-3 hover:bg-white/5"
            title="Download the file"
          >
            <span className="sr-only">Download the file</span>
            <i className="fas fa-download fa-xl" />
          </a>
        )}
      </div>
    </div>
  );
}
