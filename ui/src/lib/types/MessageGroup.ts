import { User } from './User'

export interface MessageGroup {
  id: number
  user: User
  rootUser: User
  name: string
  createdAt: string
}
