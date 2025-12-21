export function hex(number: number) {
  return `#${(number & 0xFFFFFF).toString(16).padStart(6, '0').toUpperCase()}`
}
