export interface ExtraCard {
  image: string
  url: string
  color: number
  label: string
  description: string
}

const Extras: ExtraCard[] = [
  {
    image: 'lnt',
    url: 'https://love-tolerance.com/',
    color: 0xFD3F9E,
    label: 'Get Info',
    description: 'Complete the Mine Little Pony experience with the Love&nbsp;&amp;&nbsp;Tolerance resource pack',
  },
  {
    image: 'skinpack',
    url: 'https://github.com/MineLittlePony/Community-Skin-Pack',
    color: 0x009DFF,
    label: 'Download',
    description: 'Get a quick start with this pack of more than 200 canon Mine Little Pony compatible skins',
  },
]

export default Extras
