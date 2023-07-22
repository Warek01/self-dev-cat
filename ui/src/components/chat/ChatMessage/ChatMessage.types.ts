import type { Message } from '../../../types/Message'

export interface ChatMessageProps {
  message: Message
  fromCurrentUser: boolean
  onDelete?: Function
  className?: string
}
