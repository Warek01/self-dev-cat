import { FC, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

const Modal: FC<PropsWithChildren> = ({ children }) => {
  return createPortal(
    children,
    document.getElementById('modal-root') as HTMLElement,
  )
}

export default Modal
