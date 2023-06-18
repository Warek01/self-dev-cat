import { ApiProperty } from '@nestjs/swagger'
import { IsString, MinLength } from 'class-validator'

export class ChangeUsernameDto {
  @ApiProperty({ type: String })
  @IsString()
  @MinLength(3)
  username: string
}
