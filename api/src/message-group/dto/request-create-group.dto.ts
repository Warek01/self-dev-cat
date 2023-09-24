import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator'

export class RequestCreateGroupDto {
  @ApiProperty({ type: Number })
  @IsUUID('4')
  rootUserId: string

  @ApiPropertyOptional({ type: 'uuid' })
  @IsUUID('4')
  @IsOptional()
  groupId: string

  @ApiProperty({ type: Number, isArray: true })
  @IsUUID('4', { each: true })
  @IsArray()
  userIds: string[]

  @ApiPropertyOptional({ type: String })
  @IsString()
  name?: string
}
