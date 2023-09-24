import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose, Type } from 'class-transformer'

import { UserDto } from '@/user/dto/user.dto'

@Exclude()
export class UsefulResourceDto {
  @ApiProperty({ type: 'uuid' })
  @Expose()
  id: string

  @ApiProperty({ type: String })
  @Expose()
  title: string

  @ApiProperty({ type: String })
  @Expose()
  description: string

  @ApiProperty({ type: () => UserDto })
  @Type(() => UserDto)
  @Expose()
  user: UserDto

  @ApiProperty({ type: String })
  @Expose()
  createdAt: string

  @ApiProperty({ type: String })
  @Expose()
  updatedAt: string
}
