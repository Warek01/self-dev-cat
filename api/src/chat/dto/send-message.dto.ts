import { IsOptional, IsString, IsUUID } from 'class-validator'

export class SendMessageDto {
  @IsUUID('4')
  @IsOptional()
  messageId: string

  @IsUUID('4')
  groupId: string

  @IsString()
  content: string

  @IsUUID('4')
  userId: string
}
