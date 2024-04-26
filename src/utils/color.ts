export function rgb2num(r: number, g: number, b: number) {
  let result = 0;

  result += (r & 0xFF) << 16;
  result += (g & 0xFF) << 8;
  result += b & 0xFF;

  return result;
}

export function num2rgba(
  num: number,
): [r: number, g: number, b: number, alpha: number] {
  const r = (num >> 16) & 0xFF;
  const g = (num >> 8) & 0xFF;
  const b = num & 0xFF;

  const alpha = r + g + b ? 0xFF : 0;

  return [r, g, b, alpha];
}

export function hex(number: number) {
  return `#${(number & 0xFFFFFF).toString(16).padStart(6, '0')}`;
}
