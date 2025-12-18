import type { FormEvent } from 'react'
import { useCallback, useRef } from 'react'
import { fetchSkin } from '~/utils/skin/fetchSkin'
import { $file } from '../_context'

export function useNicknameForm() {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const nickname = inputRef.current?.value

    if (nickname) {
      $file.set(fetchSkin(nickname))
    }
  }, [])

  return { inputRef, handleSubmit }
}
