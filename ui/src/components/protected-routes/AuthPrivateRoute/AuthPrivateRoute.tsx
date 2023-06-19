import { FC, PropsWithChildren, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FetchStatus } from '../../../lib/constants/enums/FetchStatus.ts'

import { Path } from '../../../lib/constants/pages/Path.ts'
import { useAppSelector } from '../../../lib/hooks/useAppSelector.ts'
import { selectCurrentUser } from '../../../lib/slices/currentUser/currentUser.slice.ts'
import type { AuthPrivateRouteProps } from './AuthPrivateRoute.types'

const AuthPrivateRoute: FC<PropsWithChildren<AuthPrivateRouteProps>> = ({
  children,
  to = Path.HOME,
  inverse = false,
}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const currentUser = useAppSelector(selectCurrentUser)

  useEffect(() => {
    if (
      location.pathname !== to &&
      ((inverse &&
        !!currentUser.accessToken &&
        currentUser.status === FetchStatus.FULFILLED &&
        !!currentUser.user) ||
        (!inverse &&
          !currentUser.accessToken &&
          currentUser.status !== FetchStatus.FULFILLED &&
          !currentUser.user))
    ) {
      navigate(to)
    }
  }, [currentUser])

  return children
}

export default AuthPrivateRoute
