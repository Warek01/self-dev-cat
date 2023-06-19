import type { FetchStatus } from '../../constants/enums/FetchStatus.ts';
import type { User } from '../../types/User';

export interface CurrentUserSliceProps {
  user: User | null
  status: FetchStatus
  accessToken: string | null
  error: unknown
}