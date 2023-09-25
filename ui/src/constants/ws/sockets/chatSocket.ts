import type { Socket } from 'socket.io-client'

import { wsManager } from '../wsManager'
import type { ChatWsEvent } from '../enums/ChatWsEvent'
import type {
  DeleteMessage,
  DeleteMessageRequest,
  JoinRoomRequest,
  JoinRoomResponse,
  SendMessage,
  DeleteAllMessages,
  Message,
} from '@/types/Chat'

interface ServerToClientEvents {
  [ChatWsEvent.JOIN_ROOMS]: (res: JoinRoomResponse) => void
  [ChatWsEvent.RECEIVE_MESSAGE]: (res: Message) => void
  [ChatWsEvent.DELETE_ALL_MESSAGES]: (dto: DeleteAllMessages) => void
  [ChatWsEvent.DELETE_MESSAGE]: (res: DeleteMessage) => void
}

interface ClientToServerEvents {
  [ChatWsEvent.JOIN_ROOMS]: (req: JoinRoomRequest) => void
  [ChatWsEvent.SEND_MESSAGE]: (req: SendMessage) => void
  [ChatWsEvent.DELETE_ALL_MESSAGES]: (dto: DeleteAllMessages) => void
  [ChatWsEvent.DELETE_MESSAGE]: (req: DeleteMessageRequest) => void
}

export const chatSocket: Socket<ServerToClientEvents, ClientToServerEvents> =
  wsManager.socket('/chat', {})

chatSocket
  .on('connect', () => console.log('connected to /chat ws'))
  .on('connect_error', (err) =>
    console.error(`error connecting to /chat ws "${err.message}"`),
  )
  .on('disconnect', (reason, description) =>
    console.warn(
      `chat ws disconnected by reason "${reason}" description: "${description}"`,
    ),
  )
