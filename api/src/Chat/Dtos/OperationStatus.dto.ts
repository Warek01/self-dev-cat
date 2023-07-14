import {IsBoolean, IsOptional, IsString} from 'class-validator'

export class OperationStatusDto {
  @IsBoolean()
  success: boolean

  @IsString()
  @IsOptional()
  message?: string

  @IsOptional()
  error?: unknown
}
