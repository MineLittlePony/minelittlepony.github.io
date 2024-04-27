import type { PixelInfo } from '@/data/pixels';

import { PixelSelect } from '../PixelSelect/PixelSelect';
import { setPixelValue, useToolsState } from '../store';
import { SettingsRow } from './SettingsRow';

export interface PixelSelectRowProps {
  info: PixelInfo;
}

export function PixelSelectRow({ info }: PixelSelectRowProps) {
  const storeValue = useToolsState(state => state.pixels[info.name]);
  const value = storeValue ?? info.options[0].color;

  function handleChange(value: number | number[]) {
    setPixelValue(info.name, value);
  }

  return (
    <SettingsRow label={info.name}>
      <PixelSelect
        options={info.options}
        value={value}
        onChange={handleChange}
      />
    </SettingsRow>
  );
}
