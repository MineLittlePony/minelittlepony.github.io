import { querySelector } from '@/scripts/utils/dom'
import { saveAs } from 'file-saver'
import { Checkbox } from '../Checkbox'
import { Component, ComponentOptions, getComponent, getComponents } from '../Component'
import { FileInfo } from './FileInfo'
import { InputForm } from './InputForm'
import { Pixel } from './Pixel'
import { Preview } from './Preview'
import { SkinSize } from './SkinSize'

export class Tools extends Component {
  public static readonly CLASS_NAME = 'tools'

  private readonly preview = getComponent(Preview, this.root)
  private readonly inputForm = getComponent(InputForm, this.root)
  private readonly fileInfo = getComponent(FileInfo, this.root)
  private readonly convert = getComponent(Checkbox, this.root)
  private readonly skinSize = getComponent(SkinSize, this.root)
  private readonly pixels = getComponents(Pixel, this.root)

  private image: HTMLImageElement | null = null
  private filename = 'None'

  constructor (options: ComponentOptions) {
    super(options)

    this.skinSize.setMaxSize(8192)
    this.convert.disable()

    for (const pixel of this.pixels) {
      pixel.on('change', ({ x, y, color }) => {
        this.preview.setPixel(x, y, color)
      })
    }

    this.inputForm.on('data', ({ filename, image }) => {
      this.image = image
      this.filename = filename
      this.fileInfo.setFilename(filename)

      this.processImage(image)
    })

    this.inputForm.onSave = async () => {
      const blob = await this.preview.toBlob()

      if (blob === null) {
        throw new Error('Canvas blob is null')
      }

      saveAs(blob, this.filename)

      // Lock controls for 1500 ms
      return await new Promise((resolve) => {
        setTimeout(resolve, 1500)
      })
    }

    this.inputForm.onReset = async () => {
      if (this.image !== null) {
        this.processImage(this.image)
      }
    }

    this.convert.on('input', (checked) => {
      this.preview.convert(checked)
    })

    this.skinSize.on('input', (sizeShift) => {
      if (sizeShift > 4) {
        this.inputForm.setWarning('You\'ve selected officially unsupported skin size')
      } else {
        this.inputForm.setWarning('')
      }

      this.preview.resize(sizeShift)

      const [width, height] = this.preview.getSize()
      this.fileInfo.setSize(width, height)
    })

    querySelector(this.root, '.loader', Element, true).remove()
    this.root.classList.remove('is-loading')
  }

  private processImage (image: HTMLImageElement): void {
    this.preview.setImage(image)

    const [width, height] = this.preview.getSize()

    this.fileInfo.setSize(width, height)
    this.skinSize.setSize(width)

    if (width > 1024) {
      this.inputForm.setWarning('Your skin size is officially unsupported')
    }

    this.convert.setChecked(false)
    this.convert.disable(!this.preview.isConvertable())

    for (const pixel of this.pixels) {
      pixel.setValue(this.preview.getPixel(pixel.x, pixel.y))
    }
  }
}
