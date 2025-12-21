import saveAs from 'file-saver'
import { Slider } from '~/components/ui/slider'
import { ToggleGroup } from '~/components/ui/toggle-group'
import { WithAtomValue } from '~/components/WithAtomValue'
import { calculateSizeShift } from '~/utils/math'
import { reloadContext, useToolsContext } from '../_context'
import { useNicknameForm } from '../_hooks/useNicknameForm'
import { PixelInput } from './pixel-input'
import { SettingsRowClassName } from './SettingsRow'
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

      {context.$layout && (
        <WithAtomValue atom={context.$layout}>
          {(value, atom) => (
            <div className={SettingsRowClassName}>
              <label>Skin layout</label>

              <ToggleGroup
                items={[
                  { value: 'original', label: 'Original' },
                  { value: 'convert', label: 'Converted' },
                  { value: 'convert-flip', label: 'Converted & flipped' },
                ]}
                value={[value]}
                onValueChange={({ value }) => value[0] && atom.set(value[0])}
              />
            </div>
          )}
        </WithAtomValue>
      )}

      <WithAtomValue atom={context.$skinSizeShift}>
        {(value, atom) => (
          <Slider
            className={SettingsRowClassName}
            label="Skin size"
            min={MIN_SIZE_SHIFT}
            max={MAX_SIZE_SHIFT}
            step={1}
            value={[value]}
            onValueChange={(e) => {
              const value = e.value[0]
              if (value === undefined) return
              atom.set(value)
            }}
            renderValue={([value = 0]) => <code>{64 << value}px</code>}
          >
            {value > MAX_SUPPORTED_SIZE_SHIFT && (
              <ToolsWarning>
                You exceeded maximum officially supported size
              </ToolsWarning>
            )}
          </Slider>
        )}
      </WithAtomValue>

      {context.pixels.map(pixel => (
        <PixelInput key={pixel.info.name} pixel={pixel} />
      ))}
    </div>
  )
}
