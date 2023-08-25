import { Type } from 'class-transformer'
import {
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

import { MessageDto } from '@/Message/Dtos'
import { UserDto } from '@/User/Dtos'

export class MessageGroupDto {
  @ApiPropertyOptional({ type: String })
  @IsUUID('4')
  @IsOptional()
  id: string

  @Type(() => MessageDto)
  @IsArray()
  messages: MessageDto[]

  @Type(() => UserDto)
  @IsArray()
  users: UserDto[]

  @Type(() => UserDto)
  rootUser: UserDto

  @IsString()
  @IsOptional()
  name?: string

  @IsDateString()
  lastMessageTimestamp: string
}
