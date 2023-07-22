import type { User } from './User'

export interface MessageGroup {
  id: number
  users: User[]
  rootUser: User
  name: string
  createdAt: string
}

export interface CreateMessageGroup {
  rootUserid: number
  name?: string
  userIds: number[]
}
