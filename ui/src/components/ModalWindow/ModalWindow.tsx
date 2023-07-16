import { FC, memo, PropsWithChildren } from 'react'
import { Backdrop } from '../index.ts'
import { ModalWindowProps } from './ModalWindow.types.ts'
import { twMerge } from 'tailwind-merge'

const ModalWindow: FC<PropsWithChildren<ModalWindowProps>> = ({
  children,
  className,
  overlayBackground = true,
  visible = true,
}) => {
  return (
    <Backdrop overlayBackground={overlayBackground} visible={visible}>
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
