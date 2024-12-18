import type { PixelValue } from '~/data/pixels';
import { ListboxOptions } from '@headlessui/react';
import { PixelSelectItem } from './PixelSelectItem';

export interface PixelSelectOptionsProps {
  options: PixelValue[];
}

export function PixelSelectOptions({ options }: PixelSelectOptionsProps) {
  return (
    <ListboxOptions className="absolute z-10 mt-2 w-full divide-y divide-zinc-500/25 overflow-hidden rounded-md border bg-white drop-shadow-md">
      {options.map(option => (
        <PixelSelectItem key={option.color} value={option} />
      ))}
    </ListboxOptions>
  );
}
