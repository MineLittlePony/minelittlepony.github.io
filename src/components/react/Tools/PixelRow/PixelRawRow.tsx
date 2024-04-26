import type { PixelInfo } from '@/data/pixels';

import { hex } from '@/utils/color';
import { colors2num } from '@/utils/colors2num';

import { Input } from '../Input';
import { setPixelValue, useToolsState } from '../store';
import { SettingsRow } from './SettingsRow';

export interface PixelRawRowProps {
  info: PixelInfo;
}

export function PixelRawRow({ info }: PixelRawRowProps) {
  const storeValue = useToolsState(state => state.pixels[info.name]);
  const value = hex(colors2num(storeValue ?? info.options[0].color));

  function handleChange(value: string) {
    const color = Number.parseInt(value.replace(/^#/, ''), 16);
    setPixelValue(info.name, color);
  }

  return (
    <SettingsRow label={info.name}>
      <Input type="color" value={value} onChange={handleChange} />
    </SettingsRow>
  );
}
