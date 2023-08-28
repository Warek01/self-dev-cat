import { ApiProperty } from '@nestjs/swagger'
import { IsIn, IsString } from 'class-validator'

export class OperationResponseDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsIn(['success', 'failure'])
  message: string
}
