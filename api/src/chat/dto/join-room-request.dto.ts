import { IsArray, IsInt, IsUUID } from 'class-validator'

export class JoinRoomRequestDto {
  @IsUUID('4', { each: true })
  @IsArray()
  groupIds: string[]

  @IsInt()
  userId: number
}
