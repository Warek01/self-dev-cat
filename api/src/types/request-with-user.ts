import type { Request } from 'express'

export interface RequestWithUser extends Request {
  user: UserCredentials
}

export interface UserCredentials {
  id: string
  username: string
  realName: string
  email: string
}
