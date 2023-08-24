import { FC, memo, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { xor } from '@helpers/xor'
import { LoadingScreen } from '@components'
import { AppRoute } from '@enums'
import { useGetCurrentUserQuery } from '@apis'
import type { AuthPrivateRouteProps } from './AuthPrivateRoute.types'
import { localStorageHelper } from '@helpers/localStorageHelper'

export const AuthPrivateRoute: FC<AuthPrivateRouteProps> = memo(
  ({ to = AppRoute.LOGIN, inverse = false, component }) => {
    const Component = component

    const navigate = useNavigate()
    const location = useLocation()
    const currentUser = useGetCurrentUserQuery(null, {
      skip: !localStorageHelper.accessToken,
    })

    useEffect(() => {
      if (
        xor(inverse, !localStorageHelper.accessToken) &&
        location.pathname !== to
      ) {
        navigate(to)
      }
    })

    return currentUser.isLoading ? <LoadingScreen /> : <Component />
  },
)
