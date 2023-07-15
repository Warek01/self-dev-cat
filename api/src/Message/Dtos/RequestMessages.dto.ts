import { IsInt, IsOptional } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class RequestMessagesDto {
  @ApiProperty({
    type: Number,
  })
  @IsInt()
  groupId: number

  @ApiPropertyOptional({
    type: Number,
    default: 0,
  })
  @IsInt()
  @IsOptional()
  skip?: number = 0

  @ApiPropertyOptional({
    type: Number,
    default: 25,
  })
  @IsInt()
  @IsOptional()
  limit?: number = 25
}
