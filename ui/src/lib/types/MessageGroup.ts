import { User } from './User.ts'

export interface MessageGroup {
  id: number
  user: User
  rootUser: User
  name: string
  createdAt: string
}
