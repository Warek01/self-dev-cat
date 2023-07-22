import { Context, createContext } from 'react'

import type { ChatContainerContextProps } from './ChatContainer.types'

export const ChatContext: Context<ChatContainerContextProps> =
  createContext<ChatContainerContextProps>({} as ChatContainerContextProps)
