import { Exclude, Expose, Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

import { UserDto } from '@/user/dto/user.dto'
import { MessageGroupDto } from '@/message-group/dto/message-group.dto'
import { AttachmentDto } from '@/attachment/dto/attachment.dto'

@Exclude()
export class MessageDto {
  @ApiProperty({ type: String })
  @Expose()
  id: string

  @ApiProperty({ type: String })
  @Expose()
  content?: string

  @ApiProperty({ type: String, isArray: true })
  @Expose()
  fileNames?: string[]

  @ApiProperty({ type: UserDto })
  @Type(() => UserDto)
  @Expose()
  user: UserDto

  @ApiProperty({ type: MessageGroupDto })
  @Type(() => MessageGroupDto)
  @Expose()
  group: MessageGroupDto

  @ApiProperty({ type: AttachmentDto, isArray: true })
  @Type(() => AttachmentDto)
  @Expose()
  attachments: AttachmentDto

  @ApiProperty({ type: MessageDto })
  @Type(() => MessageDto)
  @Expose()
  repliesTo: MessageDto

  @ApiProperty({ type: MessageDto })
  @Type(() => MessageDto)
  @Expose()
  replies: MessageDto[]
}
