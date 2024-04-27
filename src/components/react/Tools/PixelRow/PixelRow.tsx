import type { PixelInfo } from '@/data/pixels';

import { PixelRawRow } from './PixelRawRow';
import { PixelSelectRow } from './PixelSelectRow';

export interface PixelRowProps {
  info: PixelInfo;
}

export function PixelRow({ info }: PixelRowProps) {
  if (info.type === 'RAW') {
    return <PixelRawRow info={info} />;
  }

  return <PixelSelectRow info={info} />;
}
