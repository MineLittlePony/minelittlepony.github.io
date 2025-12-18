import { useNicknameForm } from '../_hooks/useNicknameForm'
import { useToolsDropzone } from '../_hooks/useToolsDropzone'
import { ToolsError } from './ToolsError'
import { ToolsUninitialized } from './ToolsUninitialized'

export function ToolsDropzone() {
  const { getRootProps, getInputProps } = useToolsDropzone()
  const { inputRef, handleSubmit } = useNicknameForm()

  return (
    <ToolsUninitialized {...getRootProps()}>
      <input {...getInputProps()} />

      <div className="text-3xl font-bold">Drop a file here or click to open</div>

      <form
        className="flex gap-2"
        onSubmit={handleSubmit}
        onClick={e => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          type="text"
          className="input"
          placeholder="or enter nickname to start"
        />

        <button type="submit" className="btn">
          <i className="fas fa-search" />
        </button>
      </form>

      <ToolsError />
    </ToolsUninitialized>
  )
}
