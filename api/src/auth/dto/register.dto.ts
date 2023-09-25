import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString } from 'class-validator'

export class RegisterDto {
  @ApiProperty({ type: String })
  @IsString()
  username: string

  @ApiProperty({ type: String })
  @IsEmail()
  email: string

  @ApiProperty({ type: String })
  @IsString()
  password: string

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  realName?: string
}
