import type { FormEvent } from 'react';
import { useCallback, useRef } from 'react';
import { fetchSkin } from '~/utils/skin/fetchSkin';
import { loadFile } from '../store';

export function useNicknameForm() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nickname = inputRef.current?.value;

    if (nickname) {
      await loadFile(() => fetchSkin(nickname));
    }
  }, []);

  return { inputRef, handleSubmit };
}
