import { IsArray, IsInt, IsNotEmptyObject } from 'class-validator'
import { Type } from 'class-transformer'

import { MessageGroupDto } from '@/MessageGroup/Dtos/MessageGroup.dto'

export class ResponseMessageGroupsDto {
  @IsNotEmptyObject()
  @IsArray()
  @Type(() => MessageGroupDto)
  items: MessageGroupDto[]

  @IsInt()
  count: number
}
