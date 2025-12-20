import { Slider } from '@ark-ui/react'
import { useAtomValue } from '@atomous/react'
import saveAs from 'file-saver'
import { ToggleGroup } from '~/components/ui/toggle-group'
import { calculateSizeShift } from '~/utils/math'
import { reloadContext, useToolsContext } from '../_context'
import { useNicknameForm } from '../_hooks/useNicknameForm'
import { PixelRow } from './PixelRow/PixelRow'
import { SettingsRowClassName } from './PixelRow/SettingsRow'
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

  const layout = useAtomValue(context.$layout)
  const skinSizeShift = useAtomValue(context.$skinSizeShift)

  const { inputRef, handleSubmit } = useNicknameForm()

  function saveFile() {
    context.$output.get().toBlob((blob) => {
      if (!blob) throw new Error('Failed to convert canvas to blob')

      saveAs(blob, context.fileName)
    })
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

      <div className={SettingsRowClassName}>
        <label>File info</label>
        <div className="flex h-10 items-center">{context.fileName}</div>
      </div>

      {context.supportsConversion && (
        <div className={SettingsRowClassName}>
          <label>Skin layout</label>

          <ToggleGroup
            items={[
              { value: 'original', label: 'Original' },
              { value: 'convert', label: 'Converted' },
              { value: 'convert-flip', label: 'Converted & flipped' },
            ]}
            value={[layout]}
            onValueChange={({ value }) => value[0] && context.$layout.set(value[0])}
          />
        </div>
      )}

      <Slider.Root
        className={SettingsRowClassName}
        min={MIN_SIZE_SHIFT}
        max={MAX_SIZE_SHIFT}
        step={1}
        value={[skinSizeShift]}
        onValueChange={(e) => {
          const value = e.value[0]
          if (value === undefined) return
          context.$skinSizeShift.set(value)
        }}
      >
        <Slider.Label>Skin size</Slider.Label>

        <div>
          <div className="flex items-center gap-2">
            <Slider.Control className="flex h-10 grow items-center">
              <Slider.Track className="h-2 grow rounded-full bg-zinc-400">
                <Slider.Range className="h-full rounded-full bg-primary" />
              </Slider.Track>

              <Slider.Thumb index={0} className="box-content size-3 rounded-full border-4 border-zinc-50 bg-primary shadow-md ring-1 shadow-zinc-700/25 ring-zinc-300" />
            </Slider.Control>

            <code>
              {`${64 << skinSizeShift}px`}
            </code>
          </div>

          {skinSizeShift > MAX_SUPPORTED_SIZE_SHIFT && (
            <ToolsWarning>
              You exceeded maximum officially supported size
            </ToolsWarning>
          )}
        </div>
      </Slider.Root>

      {context.pixels.map(([pixel, atom]) => (
        <PixelRow key={pixel.name} info={pixel} atom={atom} />
      ))}
    </div>
  )
}
