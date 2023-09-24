import { Type } from 'class-transformer'

import { MessageDto } from './message.dto'

export class ResponseMessagesDto {
  @Type(() => MessageDto)
  items: MessageDto[]

  count: number
}
