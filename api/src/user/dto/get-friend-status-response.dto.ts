import { Exclude, Expose } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

import { FriendStatus } from '@/user/enums'

@Exclude()
export class GetFriendStatusResponseDto {
  @ApiProperty({ type: Number, enum: FriendStatus })
  @Expose()
  status: FriendStatus
}
