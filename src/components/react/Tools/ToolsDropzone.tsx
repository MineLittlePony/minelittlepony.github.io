import { ToolsError } from './ToolsError';
import { ToolsUninitialized } from './ToolsUninitialized/ToolsUninitialized';
import { useNicknameForm } from './hooks/useNicknameForm';
import { useToolsDropzone } from './hooks/useToolsDropzone';

export function ToolsDropzone() {
  const { getRootProps } = useToolsDropzone();
  const { inputRef, handleSubmit } = useNicknameForm();

  return (
    <ToolsUninitialized {...getRootProps()}>
      <div className="h2">Drop a file here or click to open</div>

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
  );
}
