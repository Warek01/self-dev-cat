import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export const useSessionStorage = <T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>((): T => {
    let currentValue: T = initialValue

    try {
      currentValue = JSON.parse(
        localStorage.getItem(key) || String(initialValue),
      )
    } catch (err: unknown) {
      currentValue = initialValue
    }

    return currentValue
  })

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
