import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Exclude, Expose, Type } from 'class-transformer'

import { UsefulResourceDto } from '@/useful-resource/dto/useful-resource.dto'
import { FriendStatus } from '@/user/enums'

@Exclude()
export class UserDto {
  @ApiProperty({ type: 'uuid' })
  @Expose()
  id: string

  @ApiProperty({ type: String })
  @Expose()
  username: string

  @ApiPropertyOptional({ type: String })
  @Expose()
  realName: string

  @ApiProperty({ type: String })
  @Expose()
  email: string

  @ApiProperty({ type: () => UsefulResourceDto })
  @Type(() => UsefulResourceDto)
  @Expose()
  // usefulResources: UsefulResourceDto[]
  usefulResources: any

  @Expose()
  friendRequests: any[]

  @ApiProperty({ type: () => [UserDto] })
  @Type(() => UserDto)
  @Expose()
  friends: UserDto[]

  @ApiProperty({ type: FriendStatus, enum: FriendStatus })
  @Expose()
  friendStatus: FriendStatus

  @ApiProperty({ type: String })
  createdAt: string

  @ApiProperty({ type: String })
  updatedAt: string
}
