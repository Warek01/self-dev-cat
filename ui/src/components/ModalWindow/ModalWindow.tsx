import { FC, memo, PropsWithChildren, useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { Backdrop } from '../index'
import type { ModalWindowProps } from './ModalWindow.types'
import type { FadeRef } from '../utility/Fade/Fade.types'

const ModalWindow: FC<PropsWithChildren<ModalWindowProps>> = ({
  children,
  className,
  overlayBackground = true,
}) => {
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
}

export default memo(ModalWindow)
