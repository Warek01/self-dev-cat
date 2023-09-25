import { useRef } from 'react'

import { useOnWindowClick } from './use-on-window-click'

export const useOnClickOutside = (callback: Function) => {
  const ref = useRef<HTMLElement>(null!)

  useOnWindowClick((event) => {
    if (!ref.current?.contains(event.target as any)) {
      callback()
    }
  })

  return ref
}
