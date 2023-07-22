import { FC, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Header, SideMenu } from './components'
import { fetchCurrentUser } from './lib/auth/fetchCurrentUser'
import { toastDefaultProps } from './lib/constants/toastDefaultProps'
import { useAppDispatch } from './lib/hooks/useAppDispatch'
import { useAppSelector } from './lib/hooks/useAppSelector'
import useBreakpointCallback from './lib/hooks/useBreakpointCallback'
import * as currentUserSlice from './lib/slices/currentUser/currentUser.slice';
import { selectTheme, setIsMobile } from './lib/slices/layout/layout.slice';

const App: FC = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const accessToken = useAppSelector(currentUserSlice.selectAccessToken)
  const theme = useAppSelector(selectTheme)

  useEffect(() => {
    ;(async () => {
      if (accessToken) {
        const result = await fetchCurrentUser(accessToken)

        if (result.unauthorized) {
          toast('Credentials expired or account was deleted', { type: 'info' })
          dispatch(currentUserSlice.setToken(null))
        } else if (result.error) {
          toast('Something went wrong', { type: 'error' })
        }
      }
    })()
  }, [accessToken])

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
        <ToastContainer {...toastDefaultProps} theme={theme} />
        <Header />
        <Outlet />
        <SideMenu />
      </main>
    </div>
  )
}

export default App
