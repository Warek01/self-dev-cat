import type { AppRoute } from '../../lib/constants/enums/AppRoute.ts'

export interface AuthPrivateRouteProps {
  /** Will redirect if is authenticated */
  inverse?: boolean
  /** Path */
  to?: AppRoute | string
}
