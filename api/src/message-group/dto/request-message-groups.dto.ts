import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsInt, IsOptional } from 'class-validator'

export class RequestMessageGroupsDto {
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
