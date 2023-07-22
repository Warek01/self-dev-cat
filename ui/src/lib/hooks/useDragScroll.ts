import { MutableRefObject, useEffect, useRef } from 'react'

interface Props {
  disabled?: boolean
  withGrabCursor?: boolean
  withGrabbingCursor?: boolean
}

export const useDragScroll = <T extends HTMLElement>({
  disabled = false,
  withGrabCursor = true,
  withGrabbingCursor = true,
}: Props = {}): MutableRefObject<T> => {
  const ref: MutableRefObject<T> = useRef<T>({} as T)

  useEffect(() => {
    if (disabled) {
      return
    }

    let lastX = 0
    let lastY = 0
    let isDragging = false

    const handleMouseDown = (event: MouseEvent) => {
      lastX = event.clientX
      lastY = event.clientY
      isDragging = true

      if (withGrabCursor) {
        ref.current.classList.remove('cursor-grab')
      }

      if (withGrabbingCursor) {
        document.body.classList.add('cursor-grabbing', 'select-none')
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging) {
        return
      }

      const element = ref.current
      const x = event.clientX
      const y = event.clientY

      element.scrollBy({
        behavior: 'instant',
        top: lastY - y,
        left: lastX - x,
      })

      lastX = x
      lastY = y
    }

    const handleMouseUp = () => {
      if (!isDragging) {
        return
      }

      isDragging = false

      if (withGrabbingCursor) {
        document.body.classList.remove('cursor-grabbing', 'select-none')
      }

      if (withGrabCursor) {
        ref.current.classList.add('cursor-grab')
      }
    }

    ref.current.addEventListener('mousedown', handleMouseDown)
    document.body.addEventListener('mousemove', handleMouseMove)
    document.body.addEventListener('mouseup', handleMouseUp)

    return () => {
      ref.current?.removeEventListener('mousedown', handleMouseDown)
      document.body.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseup', handleMouseUp)
    }
  }, [disabled])

  return ref
}
