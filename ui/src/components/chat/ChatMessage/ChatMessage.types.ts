import type { Message } from '@/types/Chat'

export interface ChatMessageProps {
  openPopover: Function
  closePopover: Function
  isPopoverOpen: boolean
  message: Message
  fromCurrentUser: boolean
  onDelete: Function
}
