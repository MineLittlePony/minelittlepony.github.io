// eslint-disable-next-line unused-imports/no-unused-imports
import { addBase } from './addBase';

/**
 * Check if path is equal to or sub path of sample
 * @param sample The path to sample. Should be sanitized with {@link addBase} before passing
 * @param path The path to check. Should be `Astro.url.pathname`
 */
export function isPathEqual(sample: string, path: string) {
  if (sample === import.meta.env.BASE_URL) {
    return path === sample;
  }

  return path.startsWith(sample);
}
