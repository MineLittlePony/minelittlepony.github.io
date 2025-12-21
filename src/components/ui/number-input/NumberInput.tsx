import type { NumberInputRootProps } from '@ark-ui/react'
import type { ReactNode } from 'react'
import { NumberInputControl, NumberInputDecrementTrigger, NumberInputIncrementTrigger, NumberInputInput, NumberInputLabel, NumberInputRoot, NumberInputScrubber } from '@ark-ui/react'
import { clsx } from 'clsx/lite'

const triggerClassName = 'flex items-center justify-center surface rounded-l-none bg-zinc-100 hover:border-zinc-300 hover:bg-zinc-200'

export interface NumberInputProps extends NumberInputRootProps {
  label?: ReactNode
}

export function NumberInput({ label, ...props }: NumberInputProps) {
  return (
    <NumberInputRoot allowMouseWheel {...props}>
      {!!label && <NumberInputLabel>{label}</NumberInputLabel>}

      <div className="flex">
        <NumberInputScrubber className="flex w-4 items-center justify-center surface rounded-r-none bg-zinc-100 text-zinc-400">
          <i className="fas fa-grip-lines-vertical" />
        </NumberInputScrubber>

        <NumberInputInput className="input z-1 grow rounded-none px-2" />

        <NumberInputControl className="grid h-input w-6 grid-rows-2 text-zinc-400">
          <NumberInputIncrementTrigger className={clsx(triggerClassName, 'rounded-b-none')}>
            <i className="fas fa-angle-up fa-xs" />
          </NumberInputIncrementTrigger>

          <NumberInputDecrementTrigger className={clsx(triggerClassName, 'rounded-t-none')}>
            <i className="fas fa-angle-down fa-xs" />
          </NumberInputDecrementTrigger>
        </NumberInputControl>
      </div>
    </NumberInputRoot>
  )
}
