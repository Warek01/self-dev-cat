import { MutableRefObject, useEffect, useRef } from 'react'
import { useLocalStorage } from './useLocalStorage'

interface Props {
  storageKey: string
  disabled?: boolean
  onX?: boolean
  onY?: boolean
  widthVales?: {
    initial: number
    min: number
    max: number
  }
  heightValues?: {
    initial: number
    min: number
    max: number
  }
}

export const useResize = <T1 extends HTMLElement, T2 extends HTMLElement>({
  widthVales,
  heightValues,
  storageKey,
  disabled = false,
  onX = true,
  onY = true,
}: Props): [MutableRefObject<T1>, MutableRefObject<T2>] => {
  const elementRef: MutableRefObject<T1> = useRef<T1>({} as T1)
  const handleElementRef: MutableRefObject<T2> = useRef<T2>({} as T2)

  const [initial, setInitial] = useLocalStorage(storageKey, widthVales?.initial)

  useEffect(() => {
    let lastX = 0
    let lastY = 0
    let isResizing = false

    if (!disabled) {
      handleElementRef.current.classList.add('cursor-w-resize')
      elementRef.current.style.width = initial + 'px'
      console.log(initial)
    }

    const handleMouseDown = (event: MouseEvent) => {
      if (disabled) {
        return
      }

      lastX = event.clientX
      lastY = event.clientY
      isResizing = true

      document.body.classList.add('cursor-w-resize', 'select-none')
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (!isResizing || disabled) {
        return
      }

      const element = elementRef.current
      const { width, height } = getComputedStyle(element)

      if (onX) {
        const x = event.clientX
        const diff = parseFloat(width) + x - lastX
        lastX = x

        if (widthVales && diff >= widthVales.min && diff <= widthVales.max) {
          element.style.width = diff + 'px'
        }
      }

      if (onY) {
        const y = event.clientY
        const diff = parseFloat(height) + y - lastY
        lastY = y

        if (
          heightValues &&
          diff >= heightValues.min &&
          diff <= heightValues.max
        ) {
          element.style.height = diff + 'px'
        }
      }
    }

    const handleMouseUp = () => {
      if (!isResizing || disabled) {
        return
      }

      isResizing = false
      setInitial(parseFloat(getComputedStyle(elementRef.current!).width))

      document.body.classList.remove('cursor-w-resize', 'select-none')
    }

    handleElementRef.current.addEventListener('mousedown', handleMouseDown)
    document.body.addEventListener('mousemove', handleMouseMove)
    document.body.addEventListener('mouseup', handleMouseUp)

    return () => {
      handleElementRef.current?.removeEventListener(
        'mousedown',
        handleMouseDown,
      )
      document.body.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return [elementRef, handleElementRef]
}
