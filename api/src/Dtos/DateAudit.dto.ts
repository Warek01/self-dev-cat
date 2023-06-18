import { ApiProperty } from '@nestjs/swagger'
import { IsDate } from 'class-validator'

export class DateAuditDto {
  @ApiProperty({ type: Date })
  @IsDate()
  cratedAt: Date

  @ApiProperty({ type: Date })
  @IsDate()
  updatedAt: Date
}
