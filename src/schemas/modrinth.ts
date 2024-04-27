import { z } from 'zod';

export type Project = z.infer<typeof ProjectSchema>;

export const ProjectSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  icon_url: z.string(),
  source_url: z.string().nullable(),
  issues_url: z.string().nullable(),
  game_versions: z.array(z.string()),
});

export type ProjectVersionFile = z.infer<typeof ProjectVersionFileSchema>;

export const ProjectVersionFileSchema = z.object({
  url: z.string(),
  primary: z.boolean(),
  size: z.number(),
});

export type ProjectVersion = z.infer<typeof ProjectVersionSchema>;

export const ProjectVersionSchema = z.object({
  id: z.string(),
  version_number: z.string(),
  files: z.array(ProjectVersionFileSchema),
  game_versions: z.array(z.string()),
});

export const ProjectVersionsSchema = z.array(ProjectVersionSchema);
