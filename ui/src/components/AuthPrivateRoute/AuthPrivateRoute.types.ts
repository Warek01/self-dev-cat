import type { FC } from 'react'

import type { AppRoute } from '@enums'

export interface AuthPrivateRouteProps {
  inverse?: boolean
  to?: AppRoute | string
  component: FC
}
