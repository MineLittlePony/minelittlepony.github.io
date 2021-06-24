
function getReleaseVersion(repoName, holder) {
  fetch('https://api.github.com/repos/MineLittlePony/MineLittlePony/releases')
    .then(r => r.json())
    .then(versions => {
      versions = versions
        .filter(item => !item.draft)
        .map(item => {
          return {
            preview: item.prerelease,
            version: extractVersion(item),
            mc: extractMcVersion(item),
            url: item.html_url
          };
        });

      let gotPre;

      for (let item of versions) {
        if (item.preview) {
          if (!gotPre) {
            updateReleaseLink(item, holder.querySelector('.link.download.beta'));
            gotPre = true;
          }
          continue;
        }

        return updateReleaseLink(item, holder.querySelector('.link.download.release'));
      }
  });

  function extractVersion(release) {
    return release.tag_name;
  }

  function extractMcVersion(release) {
    return release.name
      .toLowerCase()
      .replace(/[a-z]| +/g, ' ')
      .trim()
      .split(/ +/g)
      .reverse()[0]
      .replace(/\.$/, '')
  }
}

function updateReleaseLink(release, link) {
  if (!release) return;

  link.removeAttribute('target');
  link.removeAttribute('hidden');
  link.setAttribute('data-version', release.mc);
  link.href = release.url;
}

getReleaseVersion('MineLittlePony', document.querySelector('#intro'));
