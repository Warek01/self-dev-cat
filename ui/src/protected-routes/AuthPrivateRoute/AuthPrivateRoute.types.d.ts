import type { FC } from 'react'
import type { AppRoute } from '../../lib/enums/AppRoute'

export interface AuthPrivateRouteProps {
  /** Will redirect if is authenticated */
  inverse?: boolean
  /** Path to redirect to */
  to?: AppRoute | string
  /** Component to render */
  component: FC
}
