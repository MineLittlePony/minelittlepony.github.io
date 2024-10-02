import { useDropzone } from 'react-dropzone';
import { loadFile } from '../store';

export function useToolsDropzone(noClick = false) {
  return useDropzone({
    noClick,
    accept: { 'image/png': ['.png'] },
    onDrop(acceptedFiles) {
      const file = acceptedFiles[0];

      if (file) {
        loadFile(file);
      }
    },
  });
}
