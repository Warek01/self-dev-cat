import { FC, memo, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { xor } from "@helpers/xor";
import { LoadingScreen } from '@components'
import { AppRoute } from '@enums'
import { useGetCurrentUserQuery } from '@slices/currentUser/currentUser.slice'
import type { AuthPrivateRouteProps } from './AuthPrivateRoute.types'

export const AuthPrivateRoute: FC<AuthPrivateRouteProps> = memo(
  ({ to = AppRoute.LOGIN, inverse = false, component }) => {
    const Component = component

    const navigate = useNavigate()
    const location = useLocation()
    const currentUser = useGetCurrentUserQuery(null, {
      skip: !localStorage.getItem('access_token'),
    })

    useEffect(() => {
      if (xor(inverse, !localStorage.getItem('access_token')) && location.pathname !== to) {
        navigate(to)
      }
    })

    return currentUser.isLoading ? <LoadingScreen /> :<Component />
  },
)
