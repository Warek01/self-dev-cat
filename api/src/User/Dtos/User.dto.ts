import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsArray, IsEmail, IsString } from 'class-validator'

import { BaseDto } from '@/Dtos'
import { UsefulResourceDto } from '@/UsefulResources/Dtos'

export class UserDto extends BaseDto {
  @ApiProperty({ type: String })
  @IsString()
  @Expose()
  username: string

  @ApiPropertyOptional({ type: String })
  @IsString()
  @Expose()
  realName: string

  @ApiProperty({ type: String })
  @IsEmail()
  @Expose()
  email: string

  @ApiProperty({ type: () => UsefulResourceDto })
  @Type(() => UsefulResourceDto)
  @Expose()
  usefulResources: UsefulResourceDto[]

  @Expose()
  friendRequests: any[]

  @ApiProperty({ type: () => [UserDto] })
  @Type(() => UserDto)
  @IsArray()
  @Expose()
  friends: UserDto[]

  @Expose({ groups: ['with-password'] })
  password: string
}
