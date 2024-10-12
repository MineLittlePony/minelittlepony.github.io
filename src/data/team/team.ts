import type { ImageMetadata } from 'astro';
import type { SocialLinkID } from '../socials';
import POLY from './assets/poly.png';
import ROLLING from './assets/rolling.png';
import TIKIBAT from './assets/tikibat.jpg';

export interface TeamMember {
  name: string;
  role: string;
  avatar?: ImageMetadata;
  nickname?: string;
  contacts?: Partial<Record<SocialLinkID, string>>;
}

export const TeamMembers: TeamMember[] = [
  {
    name: 'Matthew Messinger',
    role: 'Mod Development Lead',
    contacts: {
      minecraft: 'JoyJoy',
      github: 'mattmess1221',
      twitter: 'killjoy1221_',
      mastodon: '@killjoy1221@equestria.social',
    },
  },
  {
    name: 'Sollace',
    role: 'Mod Developer',
    contacts: {
      minecraft: 'Sollace',
      github: 'Sollace',
      twitter: 'SollaceTheBeard',
      mastodon: '@sollace@equestria.social',
    },
  },
  {
    name: 'Ivan Sokolov',
    role: 'Website Maintainer',
    contacts: {
      minecraft: 'Keupoz',
      github: 'keupoz',
      twitter: 'keupoz',
      vk: 'keupoz',
    },
  },
  {
    name: 'RollingTheOC',
    role: 'Discord Server Moderator',
    avatar: ROLLING,
    contacts: {
      twitter: 'RollingTheOC',
    },
  },
  {
    name: 'Tiki Bat',
    role: 'Website Maintainer',
    avatar: TIKIBAT,
    contacts: {
      twitter: 'TikiBat',
      mastodon: '@TikiBat@equestria.social',
    },
  },
  {
    name: 'Yury Polyacov',
    role: 'QA/Quality Assurance',
    avatar: POLY,
  },
];
