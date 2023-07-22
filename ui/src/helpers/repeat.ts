export function repeat<T>(obj: T, n: number): T[] {
  const repeated: T[] = []

  for (let i = 0; i < n; i++) {
    repeated.push(Object.assign({}, obj))
  }

  return repeated
}
