import {
  FC,
  memo,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { Modal } from '../index'
import type { BackdropProps } from './Backdrop.types'
import { twMerge } from 'tailwind-merge'

export const Backdrop: FC<PropsWithChildren<BackdropProps>> = ({
  children,
  visible = true,
  overlayBackground = true,
  fadeDuration = 250,
}) => {
  const [shown, setShown] = useState<boolean>(false)

  // console.log(shown)
  useEffect(() => {
    if (visible) {
      setShown(true)
    } else {
      setTimeout(() => setShown(false), fadeDuration)
    }
  }, [visible])

  const memorizedChildren: ReactElement = useMemo(
    () => (
      <Modal>
        <main
          className={twMerge(
            'absolute z-50 w-screen h-screen max-w-screen max-h-screen flex items-center justify-center',
            !visible && 'opacity-0',
            overlayBackground && 'bg-[#000]/50',
          )}
          style={{ transitionDuration: `${fadeDuration}ms` }}
        >
          {children}
        </main>
      </Modal>
    ),
    [fadeDuration, overlayBackground, children, visible],
  )

  return shown && memorizedChildren
}

export default memo(Backdrop)
