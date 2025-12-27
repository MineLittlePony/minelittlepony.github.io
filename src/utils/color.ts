export function hex(number: number, minLength = 6) {
  return `#${(number & 0xFFFFFF).toString(16).padStart(minLength, '0').toUpperCase()}`
}
