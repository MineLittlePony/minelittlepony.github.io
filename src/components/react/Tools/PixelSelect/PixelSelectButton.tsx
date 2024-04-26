import { Listbox } from '@headlessui/react';
import { useContext } from 'react';

import type { PixelValue } from '@/data/pixels';

import { SettingsRowContext } from '../PixelRow/SettingsRow';
import { PixelLabel } from './PixelLabel';

export interface PixelSelectButtonProps {
  value: PixelValue | PixelValue[];
}

export function PixelSelectButton({ value }: PixelSelectButtonProps) {
  const id = useContext(SettingsRowContext);

  return (
    <Listbox.Button id={id} className="input flex w-full items-center gap-2">
      <PixelLabel value={value} />

      <i className="fas fa-chevron-down" />
    </Listbox.Button>
  );
}
