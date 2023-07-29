import { fetchSkin, file2image } from '@/scripts/utils/file'
import { Component, ComponentOptions } from '../Component'
import { IconButton } from '../IconButton'

export interface InputFormEvents {
  data: {
    filename: string
    image: HTMLImageElement
  }
}

const noop = () => Promise.resolve()

export class InputForm extends Component<InputFormEvents> {
  public static readonly CLASS_NAME = 'input-form'

  private readonly warning = this.getElement('warning', HTMLElement, true)
  private readonly error = this.getElement('error', HTMLElement, true)
  private readonly file = this.getElement('file', HTMLInputElement, true)
  private readonly form = this.getElement('form', HTMLFormElement, true)
  private readonly nickname = this.getElement('nickname', HTMLInputElement, true)

  private readonly submit = this.getComponent('submit', IconButton)
  private readonly loading = this.getComponent('loading', IconButton)
  private readonly open = this.getComponent('open', IconButton)
  private readonly save = this.getComponent('save', IconButton)
  private readonly reset = this.getComponent('reset', IconButton)

  public onSave = noop
  public onReset = noop

  constructor (options: ComponentOptions) {
    super(options)

    this.save.disable()
    this.reset.disable()

    this.form.addEventListener('submit', (e) => {
      e.preventDefault()

      const value = encodeURIComponent(this.nickname.value.trim())

      if (value.length === 0) {
        this.nickname.focus()
      } else {
        this.lockAndResolve(fetchSkin(value).then(this.processFile))
      }
    })

    this.file.addEventListener('change', () => {
      try {
        const files = this.file.files

        if (files === null) {
          throw new Error('Input property "files" is null')
        }

        if (files.length === 0) return

        const file = files.item(0)

        if (file === null) {
          throw new Error('File is null')
        }

        this.handleFile(file).catch(this.handleError)
      } catch (err) {
        this.handleError(err)
      }
    })

    this.open.addEventListener('click', (e) => {
      e.preventDefault()

      this.file.value = ''
      this.file.click()
    })

    this.save.addEventListener('click', (e) => {
      e.preventDefault()

      this.lockAndResolve(this.onSave())
    })

    this.reset.addEventListener('click', (e) => {
      e.preventDefault()

      this.lockAndResolve(this.onReset())
    })

    document.addEventListener('keydown', (e) => {
    // Handle Ctrl combinations only
      if (!e.ctrlKey || e.shiftKey || e.metaKey || e.altKey) return

      if (e.code === 'KeyO') {
        e.preventDefault()
        this.open.click()
      }

      if (e.code === 'KeyS') {
        e.preventDefault()
        this.save.click()
      }
    })

    document.addEventListener('dragover', (e) => {
      e.preventDefault()
    })

    document.addEventListener('drop', (e) => {
      e.preventDefault()

      if (e.dataTransfer === null) {
        throw new Error('dataTransfer is null')
      }

      const file = e.dataTransfer.files.item(0)

      if (file !== null) {
        this.handleFile(file)
      }
    })
  }

  public setWarning (message: string): void {
    this.warning.innerText = message
  }

  private setBusy (busy = true): void {
    this.nickname.disabled = busy

    this.submit.disable(busy)
    this.open.disable(busy)
    this.save.disable(busy)
    this.reset.disable(busy)

    this.submit.hide(busy)
    this.loading.hide(!busy)
  }

  private readonly handleError = (err: any): void => {
    console.error(err)

    if (err instanceof Error) {
      err = err.message
    }

    this.error.innerText = String(err)
    this.setBusy(false)
  }

  private async lockAndResolve<T> (promise: Promise<T>): Promise<T | null> {
    this.error.innerText = ''

    try {
      this.setBusy(true)

      const result = await promise

      this.setBusy(false)

      return result
    } catch (err) {
      this.handleError(err)
    }

    return null
  }

  private readonly processFile = async (file: File): Promise<void> => {
    const image = await file2image(file)

    this.dispatch('data', { filename: file.name, image })
  }

  private async handleFile (file: File): Promise<void> {
    await this.lockAndResolve(this.processFile(file))
  }
}
