import type { Path } from '../../../lib/constants/pages/Path.ts'

export interface AuthPrivateRouteProps {
  /** Will redirect if is authenticated */
  inverse?: boolean
  /** Path */
  to?: Path | string
}
