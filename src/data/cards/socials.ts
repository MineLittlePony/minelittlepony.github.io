export interface SocialSite {
  title: string;
  icon: string;
  url: (name: string) => string;
}

const declareSite = (site: SocialSite) => site;

const appendedUrl = (url: string) => (name: string) => `${url}${name}`;

const github = declareSite({
  title: "GitHub",
  icon: "github",
  url: appendedUrl("https://github.com/"),
});

const twitter = declareSite({
  title: "Twitter",
  icon: "twitter",
  url: appendedUrl("https://twitter.com/"),
});

const vk = declareSite({
  title: "VK",
  icon: "vk",
  url: appendedUrl("https://vk.com/"),
});

const mastodon = declareSite({
  title: "Mastodon",
  icon: "mastodon",
  url: (name: string) => {
    name = name.split('@');
    return `https://${name[2]}/@${name[1]}`;
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
