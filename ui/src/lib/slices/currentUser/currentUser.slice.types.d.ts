import type { FetchStatus } from '../../enums/FetchStatus.ts'
import type { User } from '../../types/User.ts'

export interface CurrentUserSliceProps {
  user: User | null
  status: FetchStatus
  accessToken: string | null
  error: unknown
}
