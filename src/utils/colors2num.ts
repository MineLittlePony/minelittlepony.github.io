export function colors2num(value: number | number[]) {
  let colorNumber = 0;

  if (Array.isArray(value)) {
    for (const color of value) {
      colorNumber <<= 8;
      colorNumber += color;
    }
  } else {
    colorNumber = value;
  }

  return colorNumber;
}
