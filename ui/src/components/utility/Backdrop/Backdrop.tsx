import { FC, memo, PropsWithChildren } from 'react'

import { Modal } from '../../index'
import type { BackdropProps } from './Backdrop.types'
import { twMerge } from 'tailwind-merge'

export const Backdrop: FC<PropsWithChildren<BackdropProps>> = ({
  children,
  overlayBackground = true,
}) => {
  return (
    <Modal>
      <main
        className={twMerge(
          'absolute z-50 w-screen h-screen max-w-screen max-h-screen flex items-center justify-center',
          overlayBackground && 'bg-[#000]/50',
        )}
      >
        {children}
      </main>
    </Modal>
  )
}

export default memo(Backdrop)
