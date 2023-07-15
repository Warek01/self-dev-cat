import { createContext } from 'react'

import type { ChatContainerContextProps } from './ChatContainer.types.ts'

export const ChatContext = createContext<ChatContainerContextProps>({
  sendMessage: async () => {},
  requestMessages: async () => {},
})
