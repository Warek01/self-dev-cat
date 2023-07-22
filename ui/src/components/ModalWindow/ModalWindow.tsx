import { FC, memo, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

import { Backdrop } from '@components'
import type { ModalWindowProps } from './ModalWindow.types'

export const ModalWindow: FC<PropsWithChildren<ModalWindowProps>> = memo(
  ({ children, className, overlayBackground = true }) => {
    return (
      <Backdrop overlayBackground={overlayBackground}>
        <div
          className={twMerge(
            'relative w-full max-w-[750px] flex flex-col items-stert justify-start p-12 gap-6',
            'bg-card-bg dark:bg-card-bg-dark rounded-2xl shadow-xl',
            className,
          )}
        >
          {children}
        </div>
      </Backdrop>
    )
  },
)
