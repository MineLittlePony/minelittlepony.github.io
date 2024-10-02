import { Listbox } from '@headlessui/react';
import { clsx } from 'clsx';
import { type FC, Fragment } from 'react';
import type { PixelValue } from '~/data/pixels';
import { PixelLabel } from './PixelLabel';

export interface PixelSelectItemProps {
  value: PixelValue;
}

export const PixelSelectItem: FC<PixelSelectItemProps> = ({ value }) => {
  return (
    <Listbox.Option key={value.color} value={value} as={Fragment}>
      {({ selected }) => (
        <li
          className={clsx(
            'flex h-10 select-none items-center gap-2 px-4 hover:bg-primary hover:text-white',
            {
              'bg-primary text-white': selected,
            },
          )}
        >
          <PixelLabel value={value} />
        </li>
      )}
    </Listbox.Option>
  );
};
