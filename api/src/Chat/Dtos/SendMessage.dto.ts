import {IsInt, IsString} from "class-validator";

export class SendMessageDto {
  @IsInt()
  groupId: number

  @IsString()
  content: string

  @IsInt()
  userId: number
}
