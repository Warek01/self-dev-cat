import { IsUUID, Min } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UploadFilesFromMessageDto {
  @ApiProperty({ type: 'uuid' })
  @IsUUID('4')
  @Min(0)
  messageId: string
}
