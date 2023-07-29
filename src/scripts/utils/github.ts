// types copied from https://github.com/unjs/ungh/blob/main/types/index.ts

export interface GithubRepo {
  id: number;
  name: string;
  repo: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
  stars: number;
  watchers: number;
  forks: number;
}
export interface GithubOrg {
  id: number;
  name: string;
  description: string;
}
export interface GithubUser {
  id: string;
  username: string;
}
export interface GithubContributor {
  id: string;
  username: string;
  contributions: number;
}
export interface GithubFile {
  path: string;
  mode: string;
  sha: string;
  size: number;
}

export interface GithubRelease {
  id: number;
  tag: string;
  author: string;
  name: string;
  draft: boolean;
  prerelease: boolean;
  createdAt: string;
  publishedAt: string;
  markdown: string;
  html: string;
}

export interface GithubFileData {
  contents: string;
  html?: string;
}

export type Endpoints = {
  '/repos/{owner}/{name}': { repo: GithubRepo };
  '/repos/{owner}/{name}/contributors': { contributors: GithubContributor[] };
  '/repos/{owner}/{name}/files/{branch}': { meta: { sha: string }; files: GithubFile[] };
  '/repos/{owner}/{name}/files/{branch}/{...path}': { meta: { url: string }; file: GithubFileData };
  '/repos/{owner}/{name}/readme': { html: string; markdown: string };
  '/repos/{owner}/{name}/releases': { releases: GithubRelease[] };
  '/repos/{owner}/{name}/releases/latest': { release: GithubRelease };
  '/orgs/{owner}': { org: GithubOrg };
  '/org/{owner}/repos': { repos: GithubRepo[] };
  '/stars/{repo}': { totalStars: number; stars: Record<string, number> };
  '/users/find/{query}': { user: GithubUser };
}

type EndpointArgNames<U extends string> = U extends `${string}{${infer A}}${infer B}`
  ? A extends `...${infer C}`
  ? C | EndpointArgNames<B>
  : A | EndpointArgNames<B>
  : never;

type EndpointArgs<U extends keyof Endpoints> = Record<EndpointArgNames<U>, string>

const UNGH_URL = 'https://ungh.cc'

function interpolate (text: string, args: [string, unknown][]) {
  for (const [key, val] of args) {
    if (text.includes(`{...${key}}`)) {
      text.replace(`{...${key}}`, String(val))
    } else {
      text = text.replace(`{${key}}`, String(val))
    }
  }
  return text
}

export async function fetchUrl<U extends keyof Endpoints> (url: U, args: EndpointArgs<U>): Promise<Endpoints[U]> {
  const path = interpolate(url, Object.entries(args))

  const r = await fetch(UNGH_URL + path)
  const data = await r.json()
  if (r.ok) {
    return data
  }
  throw new Error(data.message)
}
