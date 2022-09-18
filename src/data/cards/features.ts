export interface FeatureCard {
  image: string
  iconPrefix: string
  iconName: string
  color: number
  title: string
  content: string
}

const Features: FeatureCard[] = [
  {
    image: 'clientside',
    iconPrefix: 'fas',
    iconName: 'share-nodes',
    color: 0xed4f4f,
    title: 'Client-side',
    content: 'Mine Little Pony is unreliant on server plugins and works seamlessly with other Pony clients'
  },
  {
    image: 'ponytype',
    iconPrefix: 'fas',
    iconName: 'horse-head',
    color: 0xff861e,
    title: 'Variety of Pony Types',
    content: 'Be an earth pony, pegasus, unicorn, bat pony, and more with trigger pixels'
  },
  {
    image: 'customizable',
    iconPrefix: 'fas',
    iconName: 'paintbrush',
    color: 0xffc400,
    title: 'Highly Customizable',
    content: 'Mine Little Pony supports custom skins and custom player model modifications'
  },
  {
    image: 'mobs',
    iconPrefix: 'fas',
    iconName: 'skull',
    color: 0x3f72e5,
    title: 'Ponified Mobs',
    content: 'Mobs have also been transformed into ponies and can be textured using resource packs'
  },
  {
    image: 'hdskins',
    iconPrefix: 'fas',
    iconName: 'palette',
    color: 0x7f59c6,
    title: 'HD Skins',
    content: 'Tired of 8x8 faces? Mine Little Pony has its own skin server that supports high definition skins'
  },
  {
    image: 'armor',
    iconPrefix: 'fas',
    iconName: 'shield-halved',
    color: 0xba42d6,
    title: 'Armor Compatibility',
    content: 'Minecraft armor pieces fit on Mine Little Pony models and can also be textured using resource packs'
  }
]

export default Features
