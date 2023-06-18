import type { Request } from 'express'

import type { User } from '@/Entities'

export interface RequestWithUser extends Request {
  user: Omit<User, 'password'>
}

export type {}
