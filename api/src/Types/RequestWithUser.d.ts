import type { Request } from 'express'

export interface RequestWithUser extends Request {
  user: UserCredentials
}

export interface UserCredentials {
  userId: number
  username: string
}
