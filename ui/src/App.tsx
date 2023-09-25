import { FC, useEffect } from "react";
import { Outlet } from 'react-router-dom'

import { DefaultLayout } from '@components'
import { localStorageHelper } from "@helpers";
import { useAppDispatch } from "@hooks";
import { setUser } from "@redux/auth.slice";

const App: FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token: string | null = localStorageHelper.accessToken

    if (!token) {
      return
    }

    dispatch(setUser(token))
  }, []);

  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  )
}

export default App
