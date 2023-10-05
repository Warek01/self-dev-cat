import { IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class GetFriendStatusRequestDto {
  @ApiProperty({ type: String })
  @IsUUID('4')
  userId1: string

  @ApiProperty({ type: String })
  @IsUUID('4')
  userId2: string
}
