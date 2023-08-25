import { IsOptional, IsString, IsUUID } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateMessageDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID('4')
  messageId: string

  @ApiProperty({ type: String })
  @IsUUID('4')
  groupId: string

  @ApiProperty({ type: Number })
  @IsUUID('4')
  userId: string

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  content?: string
}
