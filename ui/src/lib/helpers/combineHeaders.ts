export function combineObjects(...objects: object[]): object {
  const combined: object = {}

  objects.forEach(obj => {
    Object.assign(combined, obj)
  })

  return combined
}
