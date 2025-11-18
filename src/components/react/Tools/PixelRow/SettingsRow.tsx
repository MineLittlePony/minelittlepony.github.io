import type { PropsWithChildren } from 'react'
import { createContext, useId } from 'react'

export interface SettingsRowProps {
  label: string
}

// eslint-disable-next-line react-refresh/only-export-components
export const SettingsRowContext = createContext<string | undefined>(undefined)

export function SettingsRow({
  label,
  children,
}: PropsWithChildren<SettingsRowProps>) {
  const id = useId()

  return (
    <div className="grid grid-cols-4 items-center gap-2 py-2">
      <label className="col-span-1 select-none" htmlFor={id}>
        {label}
      </label>

      <div className="col-span-3">
        <SettingsRowContext.Provider value={id}>
          {children}
        </SettingsRowContext.Provider>
      </div>
    </div>
  )
}
