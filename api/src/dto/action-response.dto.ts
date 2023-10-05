import { ApiProperty } from '@nestjs/swagger'

export class ActionResponseDto {
  @ApiProperty({ type: String })
  message: string
}
