import { useToolsState } from './store';

export function ToolsError() {
  const error = useToolsState(state => state.error);

  if (!error) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 font-bold text-red-500">
      <i className="fas fa-triangle-exclamation" />
      <span>{error}</span>
    </div>
  );
}
