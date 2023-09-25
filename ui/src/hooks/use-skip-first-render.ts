import { useEffect, useRef } from 'react'

export const useSkipFirstRender = (
  func: Function,
  deps?: any[],
  destructor?: () => void,
) => {
  const mountedRef = useRef<boolean>(false)

  useEffect(() => {
    if (mountedRef.current) func()
    else mountedRef.current = true
    return destructor
  }, deps)
}
