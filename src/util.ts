export function wrap(val: number, max: number) {
  return ((val % max) + max) % max;
}
