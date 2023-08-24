import { FC, memo, useCallback } from 'react'

import icons from '@icons'
import { Button, Modal } from '@components'
import { useAppDispatch, useAppSelector } from '@hooks'
import { closeModal } from '@slices'

export const ModalWindowModule: FC = memo(() => {
  const dispatch = useAppDispatch()
  const { modalWindowElement } = useAppSelector((state) => state.layout)

  const handleClose = useCallback(() => {
    dispatch(closeModal())
  }, [])

  return (
    modalWindowElement && (
      <Modal>
        <main className="absolute z-50 w-screen h-screen max-w-screen max-h-screen flex items-center justify-center bg-[#000]/50">
          <div
            className="relative w-full max-w-[750px] flex flex-col items-stert justify-start p-12 gap-6 bg-card-bg
            dark:bg-card-bg-dark rounded-2xl shadow-xl"
          >
            <Button
              circle
              className="absolute top-3 right-3"
              Icon={icons.Close}
              iconSize={24}
              onClick={handleClose}
            />
            {modalWindowElement}
          </div>
        </main>
      </Modal>
    )
  )
})
