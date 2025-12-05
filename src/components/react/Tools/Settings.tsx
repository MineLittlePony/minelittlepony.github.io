import type { ChangeEvent } from 'react'
import { useId } from 'react'
import { Pixels } from '~/data/pixels'
import { calculateSizeShift } from '~/utils/math'
import { useNicknameForm } from './hooks/useNicknameForm'
import { PixelRow } from './PixelRow/PixelRow'
import { SettingsRow } from './PixelRow/SettingsRow'
import { reloadFile, saveFile, setToolsState, useToolsState } from './store'
import { ToolsError } from './ToolsError'
import { ToolsWarning } from './ToolsWarning'

const MIN_SIZE_SHIFT = calculateSizeShift(64)
const MAX_SIZE_SHIFT = calculateSizeShift(8192)
const MAX_SUPPORTED_SIZE_SHIFT = calculateSizeShift(1024)

export interface SettingsProps {
  requestFile: () => void
}

export function Settings({ requestFile }: SettingsProps) {
  const fileName = useToolsState(state => state.fileName)
  const supportConversion = useToolsState(state => state.supportConversion)
  const convert = useToolsState(state => state.convert)
  const mirrorConvert = useToolsState(state => state.mirrorConvert)
  const skinSizeShift = useToolsState(state => state.skinSizeShift)

  const convertId = useId()
  const mirrorConvertId = useId()

  const { inputRef, handleSubmit } = useNicknameForm()

  function handleConvertChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.checked
    setToolsState({ convert: value })
  }

  function handleMirrorConvertChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.checked
    setToolsState({ mirrorConvert: value })
  }

  function handleSkinSizeChange(e: ChangeEvent<HTMLInputElement>) {
    const value = Number.parseInt(e.currentTarget.value)
    setToolsState({ skinSizeShift: value })
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

          <button className="btn" type="button" onClick={reloadFile}>
            <i className="fas fa-rotate-right" />
          </button>
        </form>

        <ToolsError />
      </div>

      <SettingsRow label="File info">
        <div className="flex h-10 items-center">{fileName}</div>
      </SettingsRow>

      {supportConversion && (
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

      {Pixels.map(pixel => (
        <PixelRow key={pixel.name} info={pixel} />
      ))}
    </div>
  )
}
