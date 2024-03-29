import { Component } from '../Component'

export class FileInfo extends Component {
  public static readonly CLASS_NAME = 'file-info'

  private readonly filename = this.getElement('filename', HTMLElement, true)
  private readonly size = this.getElement('size', HTMLElement, true)

  public setFilename (name: string): void {
    this.filename.innerText = name
  }

  public setSize (width: number, height: number): void {
    this.size.innerText = `${width}x${height}`
  }
}
