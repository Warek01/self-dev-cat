import { FC, memo, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

import { Modal } from '@components'
import type { BackdropProps } from './Backdrop.types'

export const Backdrop: FC<PropsWithChildren<BackdropProps>> = memo(
  ({ children, overlayBackground = true }) => {
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
  },
)
