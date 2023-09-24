import { ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

export class UpdateUserDto {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(255)
  realName?: string

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(255)
  password?: string

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(255)
  username?: string
}
