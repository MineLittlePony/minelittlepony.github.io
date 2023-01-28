import { SelectOption } from '@/components/SelectTypes'

export interface PixelInfo {
  label: string
  determines: string
  type: 'NORMAL' | 'CONDENSED' | 'RAW'
  x: number
  y: number
  options: SelectOption[]
}

const Pixels: PixelInfo[] = [
  {
    label: 'Race',
    determines: 'your pony type',
    type: 'NORMAL',
    x: 0,
    y: 0,
    options: [
      { value: '000000', label: 'Human' },
      { value: 'f9b131', label: 'Earth pony' },
      { value: '88caf0', label: 'Pegasus' },
      { value: 'd19fe4', label: 'Unicorn' },
      { value: 'fef9fc', label: 'Alicorn' },
      { value: '282b29', label: 'Changeling' },
      { value: 'd0cccf', label: 'Zebra' },
      { value: 'caed5a', label: 'Reformed Changeling' },
      { value: 'ae9145', label: 'Gryphon' },
      { value: 'd6ddac', label: 'Hippogriff' },
      { value: 'fa88af', label: 'Kirin' },
      { value: 'eeeeee', label: 'Batpony' },
      { value: '3655dd', label: 'Seapony' }
    ]
  },
  {
    label: 'Tail length',
    determines: 'how long your tail is',
    type: 'NORMAL',
    x: 1,
    y: 0,
    options: [
      { value: '425844', label: 'Stub' },
      { value: 'd19fe4', label: 'Quarter' },
      { value: '534b76', label: 'Half' },
      { value: '8a6b7f', label: 'Three Quarters' },
      { value: '000000', label: 'Full' }
    ]
  },
  {
    label: 'Snout shape',
    determines: 'the shape of your pony\'s snout',
    type: 'NORMAL',
    x: 2,
    y: 0,
    options: [
      { value: '000000', label: 'Rounded' },
      { value: 'ffffff', label: 'Squared' },
      { value: '888888', label: 'Flat' }
    ]
  },
  {
    label: 'Body type',
    determines: 'how large your pony is',
    type: 'NORMAL',
    x: 3,
    y: 0,
    options: [
      { value: '534b76', label: 'Tall' },
      { value: 'ce3254', label: 'Bulky' },
      { value: '3254ce', label: 'Lanky' },
      { value: '000000', label: 'Normal' },
      { value: '53beff', label: 'Yearling' },
      { value: 'ffbe53', label: 'Foal' }
    ]
  },
  {
    label: 'Magic glow',
    determines: 'the color of your pony\'s magic',
    type: 'RAW',
    x: 0,
    y: 1,
    options: [
      { value: '000000', label: 'Any color you want' }
    ]
  },
  {
    label: 'Wearables',
    determines: 'what accessories your pony will have',
    type: 'CONDENSED',
    x: 1,
    y: 1,
    options: [
      { value: '16', label: 'Crown' },
      { value: '32', label: 'Muffin' },
      { value: '64', label: 'Hat' },
      { value: '96', label: 'Antlers' },
      { value: 'c6', label: 'Saddle Bags Left' },
      { value: 'c7', label: 'Saddle Bags Right' },
      { value: 'c8', label: 'Saddle Bags Both' },
      { value: 'fa', label: 'Stetson' }
    ]
  },
  {
    label: 'Tail shape',
    determines: 'shape of your tail',
    type: 'NORMAL',
    x: 2,
    y: 1,
    options: [
      { value: '000000', label: 'Straight' },
      { value: 'fc539f', label: 'Bumpy' },
      { value: '3eff22', label: 'Swirly' },
      { value: '3308c7', label: 'Spiky' }
    ]
  }
]

export default Pixels
