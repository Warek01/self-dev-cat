import { IsInt, IsOptional, IsUUID } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'

export class RequestMessagesDto {
  @ApiProperty({
    type: Number,
  })
  @IsUUID('4')
  groupId: string

  @ApiPropertyOptional({
    type: Number,
    default: 0,
  })
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @IsOptional()
  skip?: number = 0

  @ApiPropertyOptional({
    type: Number,
    default: 25,
  })
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @IsOptional()
  limit?: number = 25
}
