import { Settings } from './Settings';
import { SkinPreview } from './SkinPreview/SkinPreview';
import { useToolsDropzone } from './hooks/useToolsDropzone';

export interface ToolsMainProps {
  ctx: CanvasRenderingContext2D;
}

export function ToolsMain({ ctx }: ToolsMainProps) {
  const { getRootProps, open } = useToolsDropzone(true);

  return (
    <div
      className="flex grid-cols-2 flex-col gap-4 lg:grid"
      {...getRootProps()}
    >
      <SkinPreview ctx={ctx} />

      <Settings requestFile={open} />
    </div>
  );
}
