import type { OnlineStatusIdMap } from '@/user/user.types'

export class PingUsersStatusResponseDto {
  data: OnlineStatusIdMap[]
}
