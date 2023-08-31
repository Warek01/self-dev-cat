import { IsArray, IsInt } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

import { UserDto } from '@/User/Dtos/User.dto'

export class GetUsersResponseDto {
  @IsInt()
  @ApiProperty({ type: Number })
  count: number

  @Type(() => UserDto)
  @IsArray()
  items: UserDto[]
}
