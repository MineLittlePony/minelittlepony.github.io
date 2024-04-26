export interface SocialLink {
  id: string;
  icon: string;
  title: string;
  url?: ((handle: string) => string) | string;
}

export const SocialLinks: SocialLink[] = [
  {
    id: 'minecraft',
    icon: 'fas fa-gamepad',
    title: 'Minecraft nickname',
  },
  {
    id: 'email',
    icon: 'fas fa-envelope',
    title: 'E-Mail',
    url: 'mailto:%s',
  },
  {
    id: 'github',
    icon: 'fab fa-github',
    title: 'GitHub',
    url: 'https://github.com/%s',
  },
  {
    id: 'twitter',
    icon: 'fab fa-twitter',
    title: 'Twitter',
    url: 'https://twitter.com/%s',
  },
  {
    id: 'mastodon',
    icon: 'fab fa-mastodon',
    title: 'Mastodon',
    url(handle) {
      const [, name, instance] = handle.split('@');
      return `https://${instance}/@${name}`;
    },
  },
  {
    id: 'vk',
    icon: 'fab fa-vk',
    title: 'VK',
    url: 'https://vk.com/%s',
  },
  {
    id: 'discord',
    icon: 'fab fa-discord',
    title: 'Discord tag',
  },
];
