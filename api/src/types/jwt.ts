import type { UserDto } from '@/user/dto/user.dto'

export interface JwtResponse {
  token: string
}

export interface JwtPayload {
  readonly user: UserDto
}
