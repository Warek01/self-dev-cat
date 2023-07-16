import { FC, PropsWithChildren } from 'react'

import { Modal } from '../index'
import { BackdropProps } from './Backdrop.types'

export const Backdrop: FC<PropsWithChildren<BackdropProps>> = ({
  children,
  visible,
}) => {
  return (
    <Modal>
      <main
        className={`absolute z-50 w-screen h-screen max-w-screen max-h-screen flex items-center justify-center bg-[#000]/50 duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {children}
      </main>
    </Modal>
  )
}

export default Backdrop
