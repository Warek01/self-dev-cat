import { IsNotEmptyObject } from 'class-validator'
import { OmitType } from '@nestjs/swagger'

import { MessageDto } from '@/message/dto/message.dto'

export class ReceiveMessageDto extends OmitType(MessageDto, ['user', 'group']) {
  @IsNotEmptyObject()
  user: {
    id: string
  }
}
