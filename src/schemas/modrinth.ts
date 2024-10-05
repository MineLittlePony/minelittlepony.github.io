import { z } from 'zod';

export type Project = z.infer<typeof ProjectSchema>;
export type VersionFile = z.infer<typeof VersionFileSchema>;
export type Version = z.infer<typeof VersionSchema>;

export const ProjectSchema = z.object({
  id: z.string(),
  slug: z.string().nullable(),
  title: z.string(),
  description: z.string(),
  icon_url: z.string().nullable(),
  source_url: z.string().nullable(),
  issues_url: z.string().nullable(),
  game_versions: z.array(z.string()),
});

export const VersionFileSchema = z.object({
  url: z.string(),
  primary: z.boolean(),
  size: z.number(),
});

export const VersionSchema = z.object({
  id: z.string(),
  version_number: z.string(),
  files: z.array(VersionFileSchema),
  game_versions: z.array(z.string()),
});

export const VersionsSchema = z.array(VersionSchema);
