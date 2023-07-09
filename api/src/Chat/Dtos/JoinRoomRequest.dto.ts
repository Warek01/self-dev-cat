import { IsInt } from 'class-validator'

export class JoinRoomRequestDto {
  @IsInt()
  roomId: number

  @IsInt()
  userId: number
}
