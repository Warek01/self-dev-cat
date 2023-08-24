import { useEffect } from 'react'

type UseOnWindow = (event: keyof WindowEventMap, callback: Function) => void

export const useOnWindow: UseOnWindow = (event, callback) => {
  useEffect(() => {
    window.addEventListener(event, callback as EventListener)

    return () => {
      window.removeEventListener(event, callback as EventListener)
    }
  }, [])
}
