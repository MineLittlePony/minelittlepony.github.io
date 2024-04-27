import type { ImageMetadata } from 'astro';

import LNT from './assets/lnt.png';
import SKINPACK from './assets/skinpack.png';

export interface ExtraInfo {
  image: ImageMetadata;
  alt: string;
  url: string;
  color: number;
  label: string;
  description: string;
}

export const Extras: ExtraInfo[] = [
  {
    image: LNT,
    alt: 'Love & Tolerance',
    url: 'https://love-tolerance.com/',
    color: 0xFD3F9E,
    label: 'Go to website',
    description: 'Complete the Mine Little Pony experience with the Love&nbsp;&amp;&nbsp;Tolerance resource pack',
  },
  {
    image: SKINPACK,
    alt: 'Community Skin Pack',
    url: 'https://github.com/MineLittlePony/Community-Skin-Pack',
    color: 0x009DFF,
    label: 'Go to GitHub',
    description: 'Get a quick start with this pack of more than 200 canon Mine Little Pony compatible skins',
  },
];
