import { useEffect } from 'react'

type UseGlobalListener = (event: string, callback: Function) => void

const useGlobalListener: UseGlobalListener = (event, callback) => {
  useEffect(() => {
    window.addEventListener(event, callback as EventListener)

    return () => {
      window.removeEventListener(event, callback as EventListener)
    }
  }, [])
}

export default useGlobalListener
