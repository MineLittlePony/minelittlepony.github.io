export interface FeatureCard {
  image: string
  iconName: string
  color: number
  title: string
  content: string
}

const Features: FeatureCard[] = [
  {
    image: 'clientside',
    iconName: 'fa6-solid:share-nodes',
    color: 0xED4F4F,
    title: 'Client-side',
    content: 'Mine Little Pony is unreliant on server plugins and works seamlessly with other Pony clients',
  },
  {
    image: 'ponytype',
    iconName: 'fa6-solid:horse-head',
    color: 0xFF861E,
    title: 'Variety of Pony Types',
    content: 'Be an earth pony, pegasus, unicorn, bat pony, and more with trigger pixels',
  },
  {
    image: 'customizable',
    iconName: 'fa6-solid:paintbrush',
    color: 0xFFC400,
    title: 'Highly Customizable',
    content: 'Mine Little Pony supports custom skins and custom player model modifications',
  },
  {
    image: 'mobs',
    iconName: 'fa6-solid:skull',
    color: 0x3F72E5,
    title: 'Ponified Mobs',
    content: 'Mobs have also been transformed into ponies and can be textured using resource packs',
  },
  {
    image: 'hdskins',
    iconName: 'fa6-solid:palette',
    color: 0x7F59C6,
    title: 'HD Skins',
    content: 'Tired of 8x8 faces? Mine Little Pony has its own skin server that supports high definition skins',
  },
  {
    image: 'armor',
    iconName: 'fa6-solid:shield-halved',
    color: 0xBA42D6,
    title: 'Armor Compatibility',
    content: 'Minecraft armor pieces fit on Mine Little Pony models and can also be textured using resource packs',
  },
]

export default Features
