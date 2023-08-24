import { IsInt, Min } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UploadFilesFromMessageDto {
  @ApiProperty({ type: String })
  @IsInt()
  @Min(0)
  messageId: number
}
