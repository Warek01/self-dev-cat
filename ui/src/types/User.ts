import type { FriendStatus } from "@enums/friend-status";

export interface User {
  id: string
  realName: string
  username: string
  email: string
  friendStatus: FriendStatus
}
