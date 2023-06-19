import { FC, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { pagesConfig } from './lib/constants/pages/pagesConfig.tsx'
import { useAppDispatch } from './lib/hooks/useAppDispatch.ts'
import { useAppSelector } from './lib/hooks/useAppSelector.ts'
import { fetchCurrentUser, selectAccessToken } from './lib/slices/currentUser/currentUser.slice.ts'

const App: FC = () => {
  const dispatch = useAppDispatch()
  const userData = useAppSelector((state) => state.user)
  const accessToken = useAppSelector(selectAccessToken)

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchCurrentUser(accessToken))
    }
  }, [])

  const router = createBrowserRouter(pagesConfig)

  return <RouterProvider router={router} />
}

export default App
