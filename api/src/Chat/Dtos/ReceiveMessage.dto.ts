import { IsNotEmptyObject } from 'class-validator'
import { OmitType } from '@nestjs/swagger'

import { MessageDto } from '@/Message/Dtos'

export class ReceiveMessageDto extends OmitType(MessageDto, ['user', 'group']) {
  @IsNotEmptyObject()
  user: {
    id: string
  }
}
