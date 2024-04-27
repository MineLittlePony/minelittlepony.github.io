import type { ImageMetadata } from 'astro';

import ARMOR from './assets/armor.png';
import CLIENTSIDE from './assets/clientside.png';
import CUSTOMIZABLE from './assets/customizable.png';
import HDSKINS from './assets/hdskins.png';
import MOBS from './assets/mobs.png';
import PONYTYPE from './assets/ponytype.png';

export interface Feature {
  image: ImageMetadata;
  icon: string;
  color: number;
  title: string;
  content: string;
}

export const Features: Feature[] = [
  {
    image: CLIENTSIDE,
    icon: 'fas fa-share-nodes',
    color: 0xED4F4F,
    title: 'Client-side',
    content: 'Mine Little Pony is unreliant on server plugins and works seamlessly with other Pony clients',
  },
  {
    image: PONYTYPE,
    icon: 'fas fa-horse-head',
    color: 0xFF861E,
    title: 'Variety of Pony Types',
    content: 'Play as an earth pony, pegasus, unicorn, bat pony, and other races by customizing your skin',
  },
  {
    image: CUSTOMIZABLE,
    icon: 'fas fa-paintbrush',
    color: 0xFFC400,
    title: 'Highly Customizable',
    content: 'Mine Little Pony supports custom skins and custom player model modifications',
  },
  {
    image: MOBS,
    icon: 'fas fa-skull',
    color: 0x3F72E5,
    title: 'Ponified Mobs',
    content: 'Mobs have also been transformed into ponies and can be textured using resource packs',
  },
  {
    image: HDSKINS,
    icon: 'fas fa-palette',
    color: 0x7F59C6,
    title: 'HD Skins',
    content: 'Tired of 8x8 faces? Mine Little Pony has its own skin server that supports high definition skins',
  },
  {
    image: ARMOR,
    icon: 'fas fa-shield-halved',
    color: 0xBA42D6,
    title: 'Armor Compatibility',
    content: 'Minecraft armor pieces fit on Mine Little Pony models and can also be textured using resource packs',
  },
];
