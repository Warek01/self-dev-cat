import type { Message } from '../../../lib/types/Message'

export interface ChatMessageProps {
  message: Message
  fromCurrentUser: boolean
  onDelete?: Function
  className?: string
}
