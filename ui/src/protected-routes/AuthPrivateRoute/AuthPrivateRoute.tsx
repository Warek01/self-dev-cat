import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { LoadingScreen } from '../../components'
import { AppRoute } from '../../lib/constants/enums/AppRoute.ts'
import { FetchStatus } from '../../lib/constants/enums/FetchStatus.ts'
import { xor } from '../../lib/helpers/xor.ts'
import { useAppSelector } from '../../lib/hooks/useAppSelector.ts'
import { selectCurrentUser } from '../../lib/slices/currentUser/currentUser.slice.ts'
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
