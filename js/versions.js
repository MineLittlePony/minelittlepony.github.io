
function getReleaseVersion(repoName, releaseLink, betaLink) {
  fetch('https://api.github.com/repos/MineLittlePony/MineLittlePony/releases')
    .then(r => r.json())
    .then(versions => {
      versions = versions
        .filter(item => !item.draft)
        .map(item => {
          return {
            preview: item.prerelease,
            version: release.tag_name,
            mc: extractMcVersion(item),
            url: item.html_url
          };
        });

      let gotPre;

      for (let item of versions) {
        if (item.preview) {
          if (!gotPre && betaLink) {
            updateReleaseLink(item, betaLink);
            gotPre = true;
          }
          continue;
        }

        return updateReleaseLink(item, releaseLink);
      }
  });

  function extractMcVersion(release) {
    return release.name
      .toLowerCase()
      .replace(/[a-z]| +/g, ' ')
      .trim()
      .split(/ +/g)
      .reverse()[0]
      .replace(/\.$/, '')
  }

  function updateReleaseLink(release, link) {
    if (!release) return;

    link.removeAttribute('target');
    link.removeAttribute('hidden');
    link.dataset.mc = release.mc;
    link.dataset.version = release.version;
    link.href = release.url;
  }
}

getReleaseVersion('MineLittlePony',
 document.querySelector('#intro .link.download.release')
 document.querySelector('#intro .link.download.beta'));
getReleaseVersion('HDSkins',
 document.querySelector('#intro .link.download.hdskins'));
