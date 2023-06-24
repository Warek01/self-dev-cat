import { FC, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Header, SideMenu } from './components'
import { fetchCurrentUser } from './lib/auth/fetchCurrentUser.ts'
import { toastDefaultProps } from './lib/constants/toastDefaultProps.ts'
import { useAppDispatch } from './lib/hooks/useAppDispatch.ts'
import { useAppSelector } from './lib/hooks/useAppSelector.ts'
import useBreakpointCallback from './lib/hooks/useBreakpointCallback.ts'
import { selectAccessToken } from './lib/slices/currentUser/currentUser.slice.ts'
import { selectTheme, setIsMobile } from './lib/slices/layout/layout.slice.ts'

const App: FC = () => {
  const dispatch = useAppDispatch()
  const accessToken = useAppSelector(selectAccessToken)
  const theme = useAppSelector(selectTheme)

  useEffect(() => {
    ;(async () => {
      if (accessToken) {
        const result = await fetchCurrentUser(accessToken)

        if (result.unauthorized) {
          toast('Credentials expired', { type: 'info' })
        } else if (result.error) {
          toast('Something went wrong', { type: 'error' })
        }
      }
    })()
  }, [])

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
    <div id="layout" className="overflow-x-hidden text-black dark:text-dark-white bg-white dark:bg-dark-black">
      <main className="relative w-screen max-h-screen min-h-screen  max-w-[1920px] mx-auto xs:px-6 sm:px-12 md:px-24 xl:px-36">
        <ToastContainer {...toastDefaultProps} theme={theme} />
        <Header />
        <Outlet />
        <SideMenu />
      </main>
    </div>
  )
}

export default App
