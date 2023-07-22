import icons from '@icons'
import { FC, memo, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

import { Backdrop, Button } from '@components'
import type { ModalWindowProps } from './ModalWindow.types'

export const ModalWindow: FC<PropsWithChildren<ModalWindowProps>> = memo(
  ({ children, className, onClose, overlayBackground = true }) => {
    return (
      <Backdrop overlayBackground={overlayBackground}>
        <div
          className={twMerge(
            'relative w-full max-w-[750px] flex flex-col items-stert justify-start p-12 gap-6',
            'bg-card-bg dark:bg-card-bg-dark rounded-2xl shadow-xl',
            className,
          )}
        >
          <Button
            circle
            className="absolute top-3 right-3"
            Icon={icons.Close}
            iconSize={24}
            onClick={() => onClose?.()}
          />
          {children}
        </div>
      </Backdrop>
    )
  },
)
