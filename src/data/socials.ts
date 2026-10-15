export interface SocialLink<ID extends string = string> {
  id: ID
  icon: string
  title: string
  url?: ((handle: string) => string) | string
}

function declareSocialLinks<ID extends string>(links: SocialLink<ID>[]) {
  return links
}

export type SocialLinkID = typeof SocialLinks[number]['id']

export const SocialLinks = declareSocialLinks([
  {
    id: 'minecraft',
    icon: 'icon-[fa7-solid--gamepad]',
    title: 'Minecraft nickname',
  },
  {
    id: 'email',
    icon: 'icon-[fa7-solid--envelope]',
    title: 'E-Mail',
    url: 'mailto:%s',
  },
  {
    id: 'github',
    icon: 'icon-[fa7-brands--github]',
    title: 'GitHub',
    url: 'https://github.com/%s',
  },
  {
    id: 'twitter',
    icon: 'icon-[fa7-brands--x-twitter]',
    title: 'X (Twitter)',
    url: 'https://x.com/%s',
  },
  {
    id: 'mastodon',
    icon: 'icon-[fa7-brands--mastodon]',
    title: 'Mastodon',
    url(handle) {
      const [, name, instance] = handle.split('@')
      return `https://${instance}/@${name}`
    },
  },
  {
    id: 'vk',
    icon: 'icon-[fa7-brands--vk]',
    title: 'VK',
    url: 'https://vk.com/%s',
  },
  {
    id: 'discord',
    icon: 'icon-[fa7-brands--discord]',
    title: 'Discord tag',
  },
  {
    id: 'bluesky',
    icon: 'icon-[fa7-brands--bluesky]',
    title: 'Bluesky Profile',
    url: 'https://bsky.app/profile/%s',
  },
])
