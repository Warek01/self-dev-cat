import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator'
import { Type } from 'class-transformer'

import { Base } from '@/Entities/Helpers'
import { MessageType } from '@/Message/Enums/MessageType.enum'
import { UserDto } from '@/User/Dtos'
import { MessageGroupDto } from '@/MessageGroup/Dtos'

export class MessageDto extends Base {
  @IsString()
  @IsOptional()
  content?: string

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  fileNames?: string[]

  @IsEnum(MessageType)
  type: MessageType

  @Type(() => UserDto)
  user: UserDto

  @Type(() => MessageGroupDto)
  group: MessageGroupDto

  @Type(() => MessageDto)
  @IsOptional()
  repliesTo: MessageDto

  @IsArray()
  @Type(() => MessageDto)
  replies: MessageDto[]
}
