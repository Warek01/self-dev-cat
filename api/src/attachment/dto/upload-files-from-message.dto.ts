import { IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UploadFilesFromMessageDto {
  @ApiProperty({ type: 'uuid' })
  @IsUUID('4')
  messageId: string
}
