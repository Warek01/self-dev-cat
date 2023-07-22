import { Type } from 'class-transformer'
import { IsArray, IsInt, IsNotEmptyObject } from 'class-validator'

import { User } from '../../Entities'

export class GetFriendsResponseDto {
  @IsInt()
  count: number

  @IsArray()
  @IsNotEmptyObject()
  @Type(() => User)
  items: User[]
}
