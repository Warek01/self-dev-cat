import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateUserDto {
  @ApiPropertyOptional({ type: 'uuid' })
  @IsUUID('4')
  id: string

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
