export interface SocialSite {
  title: string;
  icon: string;
  url: (handle: string) => string;
}

const declareSite = (site: SocialSite) => site;

const appendedUrl = (url: string) => (handle: string) => `${url}${handle}`;

const github = declareSite({
  title: "GitHub",
  icon: "fa6-brands:github",
  url: appendedUrl("https://github.com/"),
});

const twitter = declareSite({
  title: "Twitter",
  icon: "fa6-brands:twitter",
  url: appendedUrl("https://twitter.com/"),
});

const vk = declareSite({
  title: "VK",
  icon: "fa6-brands:vk",
  url: appendedUrl("https://vk.com/"),
});

const mastodon = declareSite({
  title: "Mastodon",
  icon: "fa6-brands:mastodon",
  url: (handle: string) => {
    const [, name, instance] = handle.split('@');
    return `https://${instance}/@${name}`;
  }
});

const SocialSites = {
  github,
  twitter,
  vk,
  mastodon,
};

export type Site = keyof typeof SocialSites;

export default SocialSites
