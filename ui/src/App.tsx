import { FC, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { pagesConfig } from './lib/constants/pages/pagesConfig.tsx'
import { useAppDispatch } from './lib/hooks/useAppDispatch.ts'
import { useAppSelector } from './lib/hooks/useAppSelector.ts'
import { fetchUser } from './lib/slices/user/user.slice.ts';
import { store } from './lib/stores/store.ts';

const App: FC = () => {
  const dispatch = useAppDispatch()
  const userData = useAppSelector((state) => state.user)

  useEffect(() => {
    store.dispatch(fetchUser(userData.accessToken!))
  }, [])

  console.log(userData)

  const router = createBrowserRouter(pagesConfig)

  return <RouterProvider router={router} />
}

export default App
