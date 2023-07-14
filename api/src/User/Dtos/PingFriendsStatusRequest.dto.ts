import { IsArray, IsInt } from 'class-validator'

export class PingUsersStatusRequestDto {
  @IsInt({ each: true })
  @IsArray()
  ids: number[]
}
