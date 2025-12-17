import { useDropzone } from 'react-dropzone'
import { $file } from '../context'

export function useToolsDropzone(noClick = false) {
  return useDropzone({
    noClick,
    accept: { 'image/png': ['.png'] },
    onDrop(acceptedFiles) {
      const file = acceptedFiles[0]
      if (file) $file.set(file)
    },
  })
}
