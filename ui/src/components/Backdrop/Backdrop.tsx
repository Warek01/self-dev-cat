import { FC, PropsWithChildren } from 'react'

import { Modal } from '../index'

export const Backdrop: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Modal>
      <main className="absolute w-screen h-screen max-w-screen max-h-screen flex items-center justify-center bg-black/20">
        {children}
      </main>
    </Modal>
  )
}

export default Backdrop
