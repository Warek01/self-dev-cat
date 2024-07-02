import type { AuthenticatedUser } from "@/types/Auth";

export interface JwtResponse {
  token: string
}

export interface JwtPayload {
  iat: number
  exp: number
  user: AuthenticatedUser
}
