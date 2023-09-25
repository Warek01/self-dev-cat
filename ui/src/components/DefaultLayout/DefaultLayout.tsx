import { FC, memo, PropsWithChildren, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'tippy.js/dist/tippy.css'

import { toastProps } from '@constants/toast-props'
import { useAppDispatch, useAppSelector, useBreakpointCallback } from '@hooks'
import { selectTheme, setIsMobile } from '@/redux/layout.slice'
import { Header, SideMenu } from '@components'
import type { Theme } from '@/types/Theme'

export const DefaultLayout: FC<PropsWithChildren> = memo(({ children }) => {
  const dispatch = useAppDispatch()
  const theme: Theme = useAppSelector(selectTheme)

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
    <div
      id="layout"
      className="overflow-x-hidden text-black dark:text-dark-white bg-white dark:bg-dark-black"
    >
      <main className="relative w-screen max-h-screen min-h-screen max-w-[1920px] mx-auto xs:px-6 sm:px-12 md:px-24 xl:px-36 flex flex-col">
        <ToastContainer {...toastProps} theme={theme} />
        <Header />
        {children}
        <SideMenu />
      </main>
    </div>
  )
})
