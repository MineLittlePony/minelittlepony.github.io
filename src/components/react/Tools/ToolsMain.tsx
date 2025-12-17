import { useToolsDropzone } from './hooks/useToolsDropzone'
import { Settings } from './Settings'
import { SkinPreview } from './SkinPreview'

export function ToolsMain() {
  const { getRootProps, getInputProps, open } = useToolsDropzone(true)

  return (
    <div
      className="flex grid-cols-2 flex-col gap-4 lg:grid"
      {...getRootProps()}
    >
      <input {...getInputProps()} />

      <SkinPreview />

      <Settings requestFile={open} />
    </div>
  )
}
