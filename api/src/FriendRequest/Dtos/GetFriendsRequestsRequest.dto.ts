import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'
import { Transform } from 'class-transformer'

export class GetFriendsRequestsRequestDto {
  @ApiPropertyOptional({ type: Number })
  @Transform(({ value }) => JSON.parse(value))
  @IsOptional()
  skip?: number

  @ApiPropertyOptional({ type: Number })
  @Transform(({ value }) => JSON.parse(value))
  @IsOptional()
  limit?: number

  @ApiPropertyOptional({ type: Boolean, default: false })
  @Transform(({ value }) => JSON.parse(value))
  @IsOptional()
  outgoing?: boolean
}
