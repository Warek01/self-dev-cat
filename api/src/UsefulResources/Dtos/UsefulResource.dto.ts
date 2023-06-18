import { UserDto } from '@/User/Dtos'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsString } from 'class-validator'

import { BaseDto } from '@/Dtos'

export class UsefulResourceDto extends BaseDto {
  @ApiProperty({ type: String })
  @IsString()
  title: string

  @ApiProperty({ type: String })
  @IsString()
  description: string

  @ApiProperty({ type: () => UserDto })
  @Type(() => UserDto)
  user: UserDto
}
