import {IsInt, IsString} from "class-validator";

export class SendMessageDto {
  @IsInt()
  roomId: number

  @IsString()
  content: string

  @IsInt()
  userId: number
}
