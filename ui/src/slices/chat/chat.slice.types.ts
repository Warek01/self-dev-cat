import type { MessageGroup } from '@/types/MessageGroup'
import type { Message } from '@/types/Message'

export interface ChatSliceProps {
  messageGroups: MessageGroup[]
  openedMessageGroup: OpenedMessageGroup | null
}

export interface OpenedMessageGroup {
  messages: Message[]
  data: MessageGroup
}
