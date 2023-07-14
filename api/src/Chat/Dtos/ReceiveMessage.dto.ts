import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator'

export class ReceiveMessageDto {
  @IsInt()
  userId: number

  @IsString()
  @IsOptional()
  content?: string

  @IsDateString()
  timestamp: string
}
