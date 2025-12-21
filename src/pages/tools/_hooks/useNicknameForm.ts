import type { FormEvent } from 'react'
import { useRef } from 'react'
import { fetchSkin } from '~/utils/skin/fetchSkin'
import { $file } from '../_context'

export function useNicknameForm() {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const nickname = inputRef.current?.value

    if (nickname) {
      $file.set(fetchSkin(nickname))
    }
  }

  return { inputRef, handleSubmit }
}
