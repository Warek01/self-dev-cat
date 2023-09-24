import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

import { MessageGroupDto } from './message-group.dto'

export class ResponseMessageGroupsDto {
  @ApiProperty({ type: MessageGroupDto })
  @Type(() => MessageGroupDto)
  items: MessageGroupDto[]

  @ApiProperty({ type: Number })
  count: number
}
