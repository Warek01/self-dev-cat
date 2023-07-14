import { IsArray, IsObject } from 'class-validator'

import type { OnlineStatusIdMap } from '@/User/Types/OnlineStatusIdMap'

export class PingUsersStatusResponseDto {
  @IsObject({ each: true })
  @IsArray()
  data: OnlineStatusIdMap[]
}
