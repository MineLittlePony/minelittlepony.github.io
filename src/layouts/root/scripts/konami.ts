// The 'official' Konami Code sequence
const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
]

export function initKonami(callback: () => void) {
  let konamiCodePosition = 0

  function handler(e: KeyboardEvent) {
    // get the value of the required key from the konami code
    const requiredKey = KONAMI_CODE[konamiCodePosition]

    // compare the key with the required key
    if (e.code === requiredKey) {
      // move to the next key in the konami code sequence
      konamiCodePosition++

      // if the last key is reached, activate cheats
      if (konamiCodePosition === KONAMI_CODE.length) {
        konamiCodePosition = 0
        callback()
      }
    } else {
      konamiCodePosition = 0
    }
  }

  document.addEventListener('keydown', handler)
}

initKonami(() => {
  document.body.dataset.konamiState = 'solved'
})
