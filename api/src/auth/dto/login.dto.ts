import { ApiProperty } from '@nestjs/swagger'
import { IsEmail } from 'class-validator'

export class LoginDto {
  @ApiProperty({ type: String })
  @IsEmail()
  email: string

  @ApiProperty({ type: String })
  password: string
}
