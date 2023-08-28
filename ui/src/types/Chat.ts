export interface Message {
  id: string
  user: {
    id: string
  }
  content?: string
  type: string
  attachments?: Attachment[]
  replies: Message[]
  repliesTo: Message
  createdAt: string
  updatedAt: string
}

export interface JoinRoomResponse {
  success: boolean
  error?: unknown
  username?: string
  groupIds?: string[]
  groupName?: string
  userId?: string
}

export interface JoinRoomRequest {
  userId: string
  groupIds: string[]
}

export interface SendMessage {
  messageId?: string
  groupId: string
  content: string | null
  userId: string
}

export interface DeleteMessage {
  messageId: string
}

export interface DeleteMessageRequest {
  messageId: string
  groupId: string
}

export interface DeleteAllMessages {
  groupId: string
}

export interface Attachment {
  id: string
  name: string
  mime: string
  size: number
  createdAt: string
  updatedAt: string
}
