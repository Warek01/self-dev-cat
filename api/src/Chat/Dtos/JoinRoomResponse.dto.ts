import {IsBoolean, IsInt, IsOptional, IsString} from 'class-validator'

export class JoinRoomResponseDto {
  @IsBoolean()
  success: boolean

  @IsOptional()
  @IsString()
  error?: unknown

  @IsOptional()
  @IsString()
  username?: string

  @IsOptional()
  @IsInt()
  groupId?: number

  @IsOptional()
  @IsString()
  groupName?: string

  @IsOptional()
  @IsInt()
  userId?: number
}
