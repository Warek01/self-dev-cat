import { FC, memo, PropsWithChildren } from 'react'

import icons from '@icons'
import { Backdrop, Modal } from '@components/utility'
import { Button } from '@components/input'

import type { ModalWindowProps } from './ModalWindow.types'

export const ModalWindow: FC<PropsWithChildren<ModalWindowProps>> = memo(
  ({ onClose, children }) => {
    return (
      <Modal>
        <Backdrop>
          {/*<main className="absolute z-50 w-screen h-screen max-w-screen max-h-screen flex items-center justify-center bg-[#000]/50">*/}
          <div
            className="relative w-full max-w-[750px] flex flex-col items-stert justify-start p-12 gap-6 bg-card-bg
            dark:bg-card-bg-dark rounded-2xl shadow-xl"
          >
            <Button
              circle
              className="absolute top-3 right-3"
              Icon={icons.Close}
              iconSize={24}
              onClick={() => onClose()}
            />
            {children}
          </div>
          {/*</main>*/}
        </Backdrop>
      </Modal>
    )
  },
)
