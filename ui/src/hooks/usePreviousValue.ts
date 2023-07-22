import { MutableRefObject, useEffect, useRef } from 'react'

export const usePreviousValue = <T>(value: T): T => {
  const ref: MutableRefObject<T> = useRef<T>(value)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
