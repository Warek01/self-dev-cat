import { FC, memo, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

import type { Theme } from '@/types/Theme'
import { useAppSelector } from '@hooks'
import { selectTheme } from '@redux/layout.slice'

export const Modal: FC<PropsWithChildren> = memo(({ children }) => {
  const root: HTMLElement = document.getElementById('modal-root') as HTMLElement
  const theme: Theme = useAppSelector(selectTheme)

  return createPortal(<div className={theme}>{children}</div>, root)
})
