export interface JoinRoomResponse {
  success: boolean
  error?: unknown
  username?: string
  groupId?: number
  groupName?: string
  userId?: number
}

export interface JoinRoomRequest {
  userId: number
  groupId: number
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
