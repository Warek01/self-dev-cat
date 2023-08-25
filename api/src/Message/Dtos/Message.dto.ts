import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

import { UserDto } from '@/User/Dtos'
import { MessageGroupDto } from '@/MessageGroup/Dtos'

export class MessageDto {
  @ApiProperty({ type: 'uuid' })
  @IsUUID()
  id: string

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  content?: string

  @ApiProperty({ type: String, isArray: true })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  fileNames?: string[]

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
