export interface FriendRequest {
  id: string
  from: {
    id: string
    username: string
    realName: string
  }
  to?: {
    id: string
    username: string
    realName: string
  }
  createdAt: string
}

export interface FriendRequestsRequest {
  outgoing?: boolean
}
