import { FC, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { Header, SideMenu } from './components'
import { useAppDispatch } from './lib/hooks/useAppDispatch.ts'
import { useAppSelector } from './lib/hooks/useAppSelector.ts'
import useBreakpointCallback from './lib/hooks/useBreakpointCallback.ts'
import {
  fetchCurrentUser,
  selectAccessToken, selectCurrentUser,
} from './lib/slices/currentUser/currentUser.slice.ts';
import { setIsMobile } from './lib/slices/layout/layout.slice.ts'

const App: FC = () => {
  const dispatch = useAppDispatch()
  const accessToken = useAppSelector(selectAccessToken)

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchCurrentUser(accessToken))
    }
  }, [])

  useBreakpointCallback({
    Lg: {
      callback: ({ matches }) => dispatch(setIsMobile(matches)),
      initCall: true,
    },
  })

  return (
    <main className="relative w-screen max-h-screen min-h-screen overflow-auto max-w-[1920px] mx-auto xs:px-6 sm:px-12 md:px-24 xl:px-36">
      <Header />
      <Outlet />
      <SideMenu />
    </main>
  )
}

export default App
