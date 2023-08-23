import { useEffect, useRef } from 'react'

type UseSkipFirstRender = (
  func: Function,
  deps?: any[],
  destructor?: () => void,
) => void

export const useSkipFirstRender: UseSkipFirstRender = (
  func,
  deps,
  destructor,
) => {
  const mountedRef = useRef<boolean>(false)

  useEffect(() => {
    if (mountedRef.current) func()
    else mountedRef.current = true
    return destructor
  }, deps)
}
