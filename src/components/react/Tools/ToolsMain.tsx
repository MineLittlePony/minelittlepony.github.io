import { useToolsDropzone } from './hooks/useToolsDropzone';
import { Settings } from './Settings';
import { SkinPreview } from './SkinPreview/SkinPreview';

export interface ToolsMainProps {
  ctx: CanvasRenderingContext2D;
}

export function ToolsMain({ ctx }: ToolsMainProps) {
  const { getRootProps, getInputProps, open } = useToolsDropzone(true);

  return (
    <div
      className="flex grid-cols-2 flex-col gap-4 lg:grid"
      {...getRootProps()}
    >
      <input {...getInputProps()} />

      <SkinPreview ctx={ctx} />

      <Settings requestFile={open} />
    </div>
  );
}
