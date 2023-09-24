import { Transform } from 'class-transformer'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

export class GetUsersRequestDto {
  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  skip?: number

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  limit?: number
}
