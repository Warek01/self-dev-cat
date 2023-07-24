export interface Message {
  id: number
  user: {
    id: number
  }
  content?: string
  type: string
  fileNames: string[]
  replies: Message[]
  repliesTo: Message
  createdAt: string
  updatedAt: string
}

export interface JoinRoomResponse {
  success: boolean
  error?: unknown
  username?: string
  groupIds?: number[]
  groupName?: string
  userId?: number
}

export interface JoinRoomRequest {
  userId: number
  groupIds: number[]
}

export interface SendMessage {
  groupId: number
  content: string
  userId: number
}

export interface DeleteMessage {
  messageId: number
}

export interface DeleteMessageRequest {
  messageId: number
  groupId: number
}

export interface DeleteAllMessages {
  groupId: number
}
