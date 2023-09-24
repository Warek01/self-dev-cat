import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator'
import { Exclude, Expose, Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

import { UserDto } from '@/user/dto/user.dto'
import { MessageGroupDto } from '@/message-group/dto/message-group.dto'

@Exclude()
export class MessageDto {
  @ApiProperty({ type: 'uuid' })
  @Expose()
  id: string

  @ApiProperty({ type: String })
  @Expose()
  content?: string

  @ApiProperty({ type: String, isArray: true })
  @Expose()
  fileNames?: string[]

  @Type(() => UserDto)
  @Expose()
  user: UserDto

  @Type(() => MessageGroupDto)
  @Expose()
  group: MessageGroupDto

  @Type(() => MessageDto)
  @Expose()
  repliesTo: MessageDto

  @Expose()
  @Type(() => MessageDto)
  replies: MessageDto[]
}
