import type { User } from './User'

export interface MessageGroup {
  id: string
  users: User[]
  rootUser: User
  name: string
  createdAt: string
  updatedAt: string
}

export interface CreateMessageGroup {
  groupId?: string
  rootUserid: string
  name?: string
  userIds: string[]
}
