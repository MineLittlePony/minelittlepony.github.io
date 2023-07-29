<script lang="ts">
  import { parseGitHubUrl, type ModRepo } from "@/scripts/utils/links";
  import { fetchReleases } from "@/scripts/utils/releases";

  export let className: string;
  export let repo: string;
  export let title: string;

  const promise = (async ({owner, name}: ModRepo) => {
    const { release, prerelease } = await fetchReleases(owner, name);

    const releases = [];
    if (release !== null) {
      releases.push(release);
    }

    if (prerelease !== null) {
      releases.push(prerelease);
    }
    return releases;
  })(parseGitHubUrl(repo));
</script>

{#await promise}
  <a href={`${repo}/releases/latest`} class={className}>
    <span>{title}</span>
  </a>
{:then releases}
  {#each releases as release}
    <a href={release.url} class={className}>
      <span>{title} {release.prerelease ? "Beta" : ""}</span>
      <span class="version-line">
        v {release?.version} for {release?.mcVersion}
      </span>
    </a>
  {/each}
{:catch}
  <a href={`${repo}/releases/latest`} class={className}>
    <span>{title}</span>
    <span class="version-error"
      >There was an error while resolving the latest version</span
    >
  </a>
{/await}

<style>
  .version-line {
    display: block;
    color: #7f7f7f;
    font-size: 0.65em;
  }
  .version-error {
    display: block;
    color: #aa4242;
    font-size: 0.5em;
  }
</style>
