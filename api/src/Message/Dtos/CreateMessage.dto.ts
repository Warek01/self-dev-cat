import { IsInt, IsOptional, IsString } from 'class-validator'

export class CreateMessageDto {
  @IsInt()
  groupId: number

  @IsInt()
  userId: number

  @IsString()
  @IsOptional()
  content?: string
}
