import { IsArray, IsUUID } from 'class-validator'

export class PingUsersStatusRequestDto {
  @IsUUID('4', { each: true })
  @IsArray()
  ids: string[]
}
