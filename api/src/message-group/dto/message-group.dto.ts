import { Exclude, Expose, Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

import { MessageDto } from '@/message/dto/message.dto'
import { UserDto } from '@/user/dto/user.dto'

@Exclude()
export class MessageGroupDto {
  @ApiProperty({ type: String })
  @Expose()
  id: string

  @ApiProperty({ type: MessageDto })
  @Type(() => MessageDto)
  @Expose()
  messages: MessageDto[]

  @ApiProperty({ type: UserDto })
  @Type(() => UserDto)
  @Expose()
  users: UserDto[]

  @ApiProperty({ type: UserDto })
  @Type(() => UserDto)
  @Expose()
  rootUser: UserDto

  @ApiProperty({ type: String })
  @Expose()
  name?: string

  @ApiProperty({ type: String })
  @Expose()
  lastMessageTimestamp: string
}
