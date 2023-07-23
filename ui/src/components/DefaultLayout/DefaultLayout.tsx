import { OpenedModalWindow } from '@enums'
import {
  FC,
  memo,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useMemo,
} from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'tippy.js/dist/tippy.css'

import { toastDefaultProps } from '@constants/toastDefaultProps'
import { useAppDispatch, useAppSelector, useBreakpointCallback } from '@hooks'
import {
  closeModal,
  selectTheme,
  setIsMobile,
} from '@slices/layout/layout.slice'
import { Header, ModalWindow, SideMenu } from '@components'
import { ChatCreateModal } from '../chat'

export const DefaultLayout: FC<PropsWithChildren> = memo(({ children }) => {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(selectTheme)
  const openedModalWindow = useAppSelector(
    (state) => state.layout.openedModalWindow,
  )

  const modalWindowElement: ReactElement | null = useMemo(() => {
    switch (openedModalWindow) {
      case OpenedModalWindow.CHAT_SETTINGS:
        return null
      case OpenedModalWindow.CREATE_CHAT:
        return <ChatCreateModal />
      default:
        return null
    }
  }, [openedModalWindow])

  useEffect(() => {
    theme === 'dark'
      ? document.body.classList.add('dark')
      : document.body.classList.remove('dark')
  }, [theme])

  useBreakpointCallback({
    Lg: {
      callback: ({ matches }) => dispatch(setIsMobile(matches)),
      initCall: true,
    },
  })

  return (
    <>
      {modalWindowElement && (
        <ModalWindow onClose={() => dispatch(closeModal())}>
          {modalWindowElement}
        </ModalWindow>
      )}
      <div
        id="layout"
        className="overflow-x-hidden text-black dark:text-dark-white bg-white dark:bg-dark-black"
      >
        <main className="relative w-screen max-h-screen min-h-screen max-w-[1920px] mx-auto xs:px-6 sm:px-12 md:px-24 xl:px-36 flex flex-col">
          <ToastContainer {...toastDefaultProps} theme={theme} />
          <Header />
          {children}
          <SideMenu />
        </main>
      </div>
    </>
  )
})
