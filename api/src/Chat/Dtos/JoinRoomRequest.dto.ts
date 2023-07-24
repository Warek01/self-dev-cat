import { IsArray, IsInt } from 'class-validator'

export class JoinRoomRequestDto {
  @IsInt({ each: true })
  @IsArray()
  groupIds: number[]

  @IsInt()
  userId: number
}
