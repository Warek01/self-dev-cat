import { FC, memo, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

export const Modal: FC<PropsWithChildren> = memo(({ children }) => {
  return createPortal(
    children,
    document.getElementById('modal-root') as HTMLElement,
  )
})
