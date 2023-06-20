import { FC, PropsWithChildren, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { LoadingScreen } from '../../components'
import { FetchStatus } from '../../lib/constants/enums/FetchStatus.ts'
import { AppRoute } from '../../lib/constants/enums/AppRoute.ts'
import { xor } from '../../lib/helpers/xor.ts'
import { useAppSelector } from '../../lib/hooks/useAppSelector.ts'
import { selectCurrentUser } from '../../lib/slices/currentUser/currentUser.slice.ts'
import type { AuthPrivateRouteProps } from './AuthPrivateRoute.types'

const AuthPrivateRoute: FC<PropsWithChildren<AuthPrivateRouteProps>> = ({
  children,
  to = AppRoute.HOME,
  inverse = false,
}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const currentUser = useAppSelector(selectCurrentUser)

  useEffect(() => {
    const condition =
      [FetchStatus.ERROR, FetchStatus.REJECTED].includes(currentUser.status) ||
      ([FetchStatus.FULFILLED].includes(currentUser.status) && !currentUser)

    if (xor(inverse, condition)) {
      navigate(to)
    }
  }, [currentUser])

  return currentUser.status !== FetchStatus.FULFILLED ? (
    <LoadingScreen />
  ) : (
    children
  )
}

export default AuthPrivateRoute
