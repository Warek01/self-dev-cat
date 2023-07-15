import type { SendMessage } from '../../lib/ws/types/chat.ts'

export interface ChatContainerContextProps {
  sendMessage: (message: SendMessage) => Promise<void>
  requestMessages: (groupId: number) => Promise<void>
}
