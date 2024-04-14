export function initKonami(callback: () => void): void {
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

  // Variable to remember the 'position' the user has reached so far.
  let konamiCodePosition = 0

  // add keydown event listener
  document.addEventListener('keydown', (e) => {
    // get the value of the required key from the konami code
    const requiredKey = KONAMI_CODE[konamiCodePosition]

    // compare the key with the required key
    if (e.code === requiredKey) {
      // move to the next key in the konami code sequence
      konamiCodePosition++

      // if the last key is reached, activate cheats
      if (konamiCodePosition === KONAMI_CODE.length) {
        callback()
        konamiCodePosition = 0
      }
    }
    else {
      konamiCodePosition = 0
    }
  })
}
