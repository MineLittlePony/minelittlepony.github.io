import { useEffect } from 'react';

import { ToolsDropzone } from './ToolsDropzone';
import { ToolsLoader } from './ToolsLoader';
import { ToolsMain } from './ToolsMain';
import { setToolsState, useToolsState } from './store';

export function ToolsApp() {
  const loading = useToolsState(state => state.loading);
  const ctx = useToolsState(state => state.ctx);

  useEffect(() => {
    setToolsState({ loading: false });
  }, []);

  if (loading) {
    return <ToolsLoader />;
  }

  if (ctx === null) {
    return <ToolsDropzone />;
  }

  return <ToolsMain ctx={ctx} />;
}
