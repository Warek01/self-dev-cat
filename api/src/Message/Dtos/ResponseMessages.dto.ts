import { Type } from 'class-transformer'
import { IsArray, IsInt, IsNotEmptyObject } from 'class-validator'

import { MessageDto } from './Message.dto'

export class ResponseMessagesDto {
  @IsArray()
  @IsNotEmptyObject()
  @Type(() => MessageDto)
  items: MessageDto[]

  @IsInt()
  count: number
}
