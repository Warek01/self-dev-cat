import type { User } from '@/types/User'

export interface JwtResponse {
  token: string
}

export interface JwtPayload {
  iat: number
  exp: number
  user: User
}
