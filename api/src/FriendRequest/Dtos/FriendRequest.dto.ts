import { ApiProperty } from '@nestjs/swagger'
import {IsDateString, IsEnum, IsUUID} from 'class-validator'

import { UserDto } from '@/User/Dtos'
import { FriendRequestStatus } from '@/FriendRequest/Enums/FriendRequestStatus'

export class FriendRequestDto {
  @ApiProperty({ type: 'uuid' })
  @IsUUID()
  id: string

  @ApiProperty({ type: UserDto })
  from: UserDto

  @ApiProperty({ type: UserDto })
  to: UserDto

  @ApiProperty({ type: FriendRequestStatus, enum: FriendRequestStatus })
  @IsEnum(FriendRequestStatus)
  status: FriendRequestStatus

  @IsDateString()
  @ApiProperty({ type: Date })
  createdAt: string

  @IsDateString()
  @ApiProperty({ type: Date })
  updatedAt: string
}
