export interface PixelValue {
  color: number
  label: string
}

export interface PixelInfo {
  name: string
  type: 'CONDENSED' | 'NORMAL' | 'RAW' | 'NUMBER'
  x: number
  y: number
  options: [PixelValue, ...PixelValue[]]
}

export const Pixels: PixelInfo[] = [
  {
    name: 'Race',
    type: 'NORMAL',
    x: 0,
    y: 0,
    options: [
      { color: 0x000000, label: 'Human' },
      { color: 0xF9B131, label: 'Earth pony' },
      { color: 0x88CAF0, label: 'Pegasus' },
      { color: 0xD19FE4, label: 'Unicorn' },
      { color: 0xFEF9FC, label: 'Alicorn' },
      { color: 0x282B29, label: 'Changeling' },
      { color: 0xD0CCCF, label: 'Zebra' },
      { color: 0xCAED5A, label: 'Reformed Changeling' },
      { color: 0xAE9145, label: 'Gryphon' },
      { color: 0xD6DDAC, label: 'Hippogriff' },
      { color: 0xFA88AF, label: 'Kirin' },
      { color: 0xEEEEEE, label: 'Batpony' },
      { color: 0x3655DD, label: 'Seapony' },
    ],
  },
  {
    name: 'Tail length',
    type: 'NORMAL',
    x: 1,
    y: 0,
    options: [
      { color: 0x425844, label: 'Stub' },
      { color: 0xD19FE4, label: 'Quarter' },
      { color: 0x534B76, label: 'Half' },
      { color: 0x8A6B7F, label: 'Three Quarters' },
      { color: 0x000000, label: 'Full' },
    ],
  },
  {
    name: 'Snout shape',
    type: 'NORMAL',
    x: 2,
    y: 0,
    options: [
      { color: 0x000000, label: 'Rounded' },
      { color: 0xFFFFFF, label: 'Squared' },
      { color: 0x888888, label: 'Flat' },
    ],
  },
  {
    name: 'Body size',
    type: 'NORMAL',
    x: 3,
    y: 0,
    options: [
      { color: 0x534B76, label: 'Tall' },
      { color: 0xCE3254, label: 'Bulky' },
      { color: 0x3254CE, label: 'Lanky' },
      { color: 0x000000, label: 'Normal' },
      { color: 0xB2E7DD, label: 'Stocky' },
      { color: 0xA3D2C7, label: 'Squat' },
      { color: 0x53BEFF, label: 'Yearling' },
      { color: 0xFFBE53, label: 'Foal' },
    ],
  },
  {
    name: 'Magic glow',
    type: 'RAW',
    x: 0,
    y: 1,
    options: [{ color: 0x000000, label: 'Any color you want' }],
  },
  {
    name: 'Wearables',
    type: 'CONDENSED',
    x: 1,
    y: 1,
    options: [
      { color: 0x16, label: 'Crown' },
      { color: 0x32, label: 'Muffin' },
      { color: 0x64, label: 'Hat' },
      { color: 0x96, label: 'Antlers' },
      { color: 0xC6, label: 'Saddle Bags Left' },
      { color: 0xC7, label: 'Saddle Bags Right' },
      { color: 0xC8, label: 'Saddle Bags Both' },
      { color: 0xFA, label: 'Stetson' },
    ],
  },
  {
    name: 'Tail shape',
    type: 'NORMAL',
    x: 2,
    y: 1,
    options: [
      { color: 0x000000, label: 'Straight' },
      { color: 0xFC539F, label: 'Bumpy' },
      { color: 0x3EFF22, label: 'Swirly' },
      { color: 0x3308C7, label: 'Spiky' },
    ],
  },
  {
    name: 'Priority',
    type: 'NUMBER',
    x: 2,
    y: 2,
    options: [{ color: 0x000000, label: `Any integer between 0 and ${0xFFFFFF}` }],
  },
]
