import type { User } from '@/types/User'

export interface UserCardProps {
  user: User
  className?: string
  isFriend?: boolean
}
