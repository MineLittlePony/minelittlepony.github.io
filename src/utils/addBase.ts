import { join } from 'node:path/posix';

/** Add optional base that can be set in Astro config */
export function addBase(path: string) {
  let result = join(import.meta.env.BASE_URL, path);

  // Add trailing slash if there's no one and the path doesn't include a dot/file extension
  if (!result.endsWith('/') && !result.includes('.')) {
    result += '/';
  }

  return result;
}
