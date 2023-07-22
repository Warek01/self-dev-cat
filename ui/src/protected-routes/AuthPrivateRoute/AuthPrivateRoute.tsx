import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { LoadingScreen } from '../../components'
import { AppRoute } from '../../enums/AppRoute'
import { FetchStatus } from '../../enums/FetchStatus'
import { xor } from '../../helpers/xor'
import { useAppSelector } from '../../hooks/useAppSelector'
import { selectCurrentUser } from '../../slices/currentUser/currentUser.slice'
import type { AuthPrivateRouteProps } from './AuthPrivateRoute.types'

const AuthPrivateRoute: FC<AuthPrivateRouteProps> = ({
  to = AppRoute.LOGIN,
  inverse = false,
  component,
}) => {
  const Component = component

  const navigate = useNavigate()
  const currentUser = useAppSelector(selectCurrentUser)

  useEffect(() => {
    const condition =
      ![FetchStatus.FULFILLED].includes(currentUser.status) &&
      !currentUser.accessToken

    if (xor(inverse, condition)) {
      navigate(to)
    }
  }, [currentUser])

  if (currentUser.status === FetchStatus.PENDING) {
    return <LoadingScreen />
  }

  return <Component />
}

export default AuthPrivateRoute
