import { IsInt } from 'class-validator'

export class JoinRoomRequestDto {
  @IsInt()
  groupId: number

  @IsInt()
  userId: number
}
