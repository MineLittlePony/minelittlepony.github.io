import { useEffect, useRef, useState } from 'react';

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
];

export function useKonami() {
  const [resolved, setResolved] = useState(false);

  // Variable to remember the 'position' the user has reached so far.
  const konamiCodePosition = useRef(0);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      // get the value of the required key from the konami code
      const requiredKey = KONAMI_CODE[konamiCodePosition.current];

      // compare the key with the required key
      if (e.code === requiredKey) {
        // move to the next key in the konami code sequence
        konamiCodePosition.current++;

        // if the last key is reached, activate cheats
        if (konamiCodePosition.current === KONAMI_CODE.length) {
          konamiCodePosition.current = 0;
          setResolved(true);
        }
      } else {
        konamiCodePosition.current = 0;
      }
    }

    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, []);

  return resolved;
}
