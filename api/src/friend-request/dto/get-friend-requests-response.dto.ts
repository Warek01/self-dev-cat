import { IsArray, IsInt } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

import { FriendRequestDto } from './friend-request.dto'

export class GetFriendRequestsResponseDto {
  @ApiProperty({ type: Number })
  @IsInt()
  count: number

  @ApiProperty({ type: [FriendRequestDto], isArray: true })
  @Type(() => FriendRequestDto)
  @IsArray()
  items: FriendRequestDto[]
}
