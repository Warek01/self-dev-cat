export const convertSize = (size: number): string => {
  return size >= 1e9
    ? `${(size / 1e9).toFixed(2)} GB`
    : size >= 1e6
    ? `${(size / 1e6).toFixed(2)} MB`
    : size >= 1e3
    ? `${(size / 1e3).toFixed(2)} KB`
    : `${size} B`
}
