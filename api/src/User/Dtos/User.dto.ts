import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Exclude, Type } from 'class-transformer'
import { IsArray, IsEmail, IsString } from 'class-validator'

import { BaseDto } from '@/Dtos'
import { UsefulResourceDto } from '@/UsefulResources/Dtos'

export class UserDto extends BaseDto {
  @ApiProperty({ type: String })
  @IsString()
  username: string

  @ApiPropertyOptional({ type: String })
  @IsString()
  realName: string

  @ApiProperty({ type: String })
  @IsString()
  password: string

  @ApiProperty({ type: String })
  @IsEmail()
  email: string

  @ApiProperty({ type: () => UsefulResourceDto })
  @Type(() => UsefulResourceDto)
  usefulResources: UsefulResourceDto[]

  friendRequests: any[]

  @ApiProperty({ type: () => [UserDto] })
  @Type(() => UserDto)
  @IsArray()
  friends: UserDto[]
}
