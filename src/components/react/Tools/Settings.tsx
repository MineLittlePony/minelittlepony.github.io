import type { ChangeEvent } from 'react'
import { useAtomValue } from '@atomous/react'
import saveAs from 'file-saver'
import { useId } from 'react'
import { calculateSizeShift } from '~/utils/math'
import { reloadContext, useToolsContext } from './context'
import { useNicknameForm } from './hooks/useNicknameForm'
import { PixelRow } from './PixelRow/PixelRow'
import { SettingsRow } from './PixelRow/SettingsRow'
import { ToolsError } from './ToolsError'
import { ToolsWarning } from './ToolsWarning'

const MIN_SIZE_SHIFT = calculateSizeShift(64)
const MAX_SIZE_SHIFT = calculateSizeShift(8192)
const MAX_SUPPORTED_SIZE_SHIFT = calculateSizeShift(1024)

export interface SettingsProps {
  requestFile: () => void
}

export function Settings({ requestFile }: SettingsProps) {
  const context = useToolsContext()

  const convert = useAtomValue(context.$convert)
  const mirrorConvert = useAtomValue(context.$mirrorConvert)
  const skinSizeShift = useAtomValue(context.$skinSizeShift)

  const convertId = useId()
  const mirrorConvertId = useId()

  const { inputRef, handleSubmit } = useNicknameForm()

  function saveFile() {
    context.$output.get().toBlob((blob) => {
      if (!blob) throw new Error('Failed to convert canvas to blob')

      saveAs(blob, context.fileName)
    })
  }

  function handleConvertChange(e: ChangeEvent<HTMLInputElement>) {
    context.$convert.set(e.currentTarget.checked)
  }

  function handleMirrorConvertChange(e: ChangeEvent<HTMLInputElement>) {
    context.$mirrorConvert.set(e.currentTarget.checked)
  }

  function handleSkinSizeChange(e: ChangeEvent<HTMLInputElement>) {
    const value = Number.parseInt(e.currentTarget.value)
    context.$skinSizeShift.set(value)
  }

  return (
    <div className="divide-y divide-zinc-200">
      <div className="flex flex-col gap-2 py-2">
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            className="input w-0 grow"
            placeholder="Enter nickname"
          />

          <button className="btn" type="submit">
            <i className="fas fa-search" />
          </button>

          <button className="btn" type="button" onClick={requestFile}>
            <i className="fas fa-folder-open" />
          </button>

          <button className="btn" type="button" onClick={saveFile}>
            <i className="fas fa-floppy-disk" />
          </button>

          <button className="btn" type="button" onClick={reloadContext}>
            <i className="fas fa-rotate-right" />
          </button>
        </form>

        <ToolsError />
      </div>

      <SettingsRow label="File info">
        <div className="flex h-10 items-center">{context.fileName}</div>
      </SettingsRow>

      {context.supportsConversion && (
        <SettingsRow label="Skin layout">
          <div className="flex h-10 items-center gap-2">
            <input
              id={convertId}
              type="checkbox"
              checked={convert}
              onChange={handleConvertChange}
            />

            <label htmlFor={convertId} className="select-none">
              Convert to modern layout
            </label>
          </div>

          <div className="flex h-10 items-center gap-2">
            <input
              id={mirrorConvertId}
              type="checkbox"
              checked={mirrorConvert}
              onChange={handleMirrorConvertChange}
            />

            <label htmlFor={mirrorConvertId} className="select-none">
              Flip some converted parts
            </label>
          </div>
        </SettingsRow>
      )}

      <SettingsRow label="Skin size">
        <div className="flex h-10 items-center gap-2">
          <input
            className="grow"
            type="range"
            min={MIN_SIZE_SHIFT}
            max={MAX_SIZE_SHIFT}
            step={1}
            value={skinSizeShift}
            onChange={handleSkinSizeChange}
          />

          <code>
            {`${64 << skinSizeShift}px`}
          </code>
        </div>

        {skinSizeShift > MAX_SUPPORTED_SIZE_SHIFT && (
          <ToolsWarning>
            You exceeded maximum officially supported size
          </ToolsWarning>
        )}
      </SettingsRow>

      {context.pixels.map(([pixel, atom]) => (
        <PixelRow key={pixel.name} info={pixel} atom={atom} />
      ))}
    </div>
  )
}
