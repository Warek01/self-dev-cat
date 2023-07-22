import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsArray, IsInt, IsString } from 'class-validator'

export class RequestCreateGroupDto {
  @ApiProperty({ type: Number })
  @IsInt()
  rootUserId: number

  @ApiProperty({ type: Number, isArray: true })
  @IsInt({ each: true })
  @IsArray()
  userIds: number[]

  @ApiPropertyOptional({ type: String })
  @IsString()
  name?: string
}
