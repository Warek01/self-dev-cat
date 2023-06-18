import { ApiProperty } from '@nestjs/swagger'
import { IsInt, Min } from 'class-validator'

import { DateAuditDto } from './DateAudit.dto'

export class BaseDto extends DateAuditDto {
  @ApiProperty({ type: Number })
  @IsInt()
  @Min(0)
  id: number
}
