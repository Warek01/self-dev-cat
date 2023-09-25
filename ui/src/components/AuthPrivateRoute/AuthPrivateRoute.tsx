import { FC, memo, useEffect } from 'react'
import {
  Location,
  NavigateFunction,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import { AppRoute } from '@enums'
import { localStorageHelper, xor } from '@helpers'

import type { AuthPrivateRouteProps } from './AuthPrivateRoute.types'

export const AuthPrivateRoute: FC<AuthPrivateRouteProps> = memo(
  ({ to = AppRoute.LOGIN, inverse = false, component }) => {
    const Component: FC = component
    const navigate: NavigateFunction = useNavigate()
    const location: Location = useLocation()

    useEffect(() => {
      xor(inverse, !localStorageHelper.accessToken) &&
        location.pathname !== to &&
        navigate(to)
    })

    return <Component />
  },
)
