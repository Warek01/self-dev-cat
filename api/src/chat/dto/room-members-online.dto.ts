import { IsArray, IsInt } from 'class-validator'

export class RoomMembersOnlineDto {
  @IsArray()
  @IsInt({ each: true })
  ids: number[]
}
