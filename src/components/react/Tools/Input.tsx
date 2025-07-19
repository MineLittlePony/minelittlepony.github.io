import type { ChangeEvent, InputHTMLAttributes } from 'react';
import { useContext } from 'react';
import { SettingsRowContext } from './PixelRow/SettingsRow';

export interface InputProps {
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export function Input({ type, placeholder, value, onChange }: InputProps) {
  const id = useContext(SettingsRowContext);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.currentTarget.value);
  }

  return (
    <input
      type={type}
      className="input w-full"
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
}
