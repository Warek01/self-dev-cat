import { Type } from 'class-transformer'
import { IsArray, IsOptional, IsString } from 'class-validator'

import { Base } from '@/Entities/Helpers'
import { MessageDto } from '@/Message/Dtos'
import { UserDto } from '@/User/Dtos'

export class MessageGroupDto extends Base {
  @Type(() => MessageDto)
  @IsArray()
  messages: MessageDto

  @Type(() => UserDto)
  @IsArray()
  users: UserDto[]

  @Type(() => UserDto)
  rootUser: UserDto

  @IsString()
  @IsOptional()
  name?: string
}
