import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsUUID } from 'class-validator'

import { UserDto } from '@/user/dto/user.dto'

export class FriendRequestDto {
  @ApiProperty({ type: 'uuid' })
  @IsUUID()
  id: string

  @ApiProperty({ type: UserDto })
  from: UserDto

  @ApiProperty({ type: UserDto })
  to: UserDto

  @IsDateString()
  @ApiProperty({ type: Date })
  createdAt: string
}
