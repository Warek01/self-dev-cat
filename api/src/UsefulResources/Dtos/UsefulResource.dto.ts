import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDateString, IsString, IsUUID } from 'class-validator'

import { UserDto } from '@/User/Dtos'

export class UsefulResourceDto {
  @ApiProperty({ type: 'uuid' })
  @IsUUID()
  id: string

  @ApiProperty({ type: String })
  @IsString()
  title: string

  @ApiProperty({ type: String })
  @IsString()
  description: string

  @ApiProperty({ type: () => UserDto })
  @Type(() => UserDto)
  user: UserDto

  @ApiProperty({ type: String })
  @IsDateString()
  createdAt: string

  @ApiProperty({ type: String })
  @IsDateString()
  updatedAt: string
}
