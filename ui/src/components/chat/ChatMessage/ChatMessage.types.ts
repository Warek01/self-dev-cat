import type { Message } from '@/types/Chat'

export interface ChatMessageProps {
  message: Message
  fromCurrentUser: boolean
  onDelete?: Function
  className?: string
}
