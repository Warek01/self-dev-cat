import { FC, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'

import { fetchCurrentUser } from '@auth/fetchCurrentUser'
import { useAppDispatch, useAppSelector } from '@hooks'
import {
  selectAccessToken,
  setToken,
} from '@slices/currentUser/currentUser.slice'
import { DefaultLayout } from '@components'

const App: FC = () => {
  const dispatch = useAppDispatch()
  const accessToken = useAppSelector(selectAccessToken)

  useEffect(() => {
    ;(async () => {
      if (accessToken) {
        const result = await fetchCurrentUser(accessToken)

        if (result.unauthorized) {
          toast('Credentials expired or account was deleted', { type: 'info' })
          dispatch(setToken(null))
        } else if (result.error) {
          toast('Something went wrong', { type: 'error' })
        }
      }
    })()
  }, [accessToken])

  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  )
}

export default App
