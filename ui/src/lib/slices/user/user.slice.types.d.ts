import { User } from '../../types/User';

export interface UserSliceProps {
  user: User | null
  loading: boolean
  accessToken: string | null
}