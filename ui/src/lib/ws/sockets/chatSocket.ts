import type { Socket } from 'socket.io-client'

import { wsManager } from '../wsManager.ts'
import type { ChatWsEvent } from '../enums/ChatWsEvent.ts'
import type {
  JoinRoomRequest,
  JoinRoomResponse,
  SendMessage,
} from '../types/chat.ts'

interface ServerToClientEvents {
  [ChatWsEvent.JOIN_ROOM]: (res: JoinRoomResponse) => void
  [ChatWsEvent.RECEIVE_MESSAGE]: (res: SendMessage) => void
}

interface ClientToServerEvents {
  [ChatWsEvent.JOIN_ROOM]: (req: JoinRoomRequest) => void
  [ChatWsEvent.SEND_MESSAGE]: (req: SendMessage) => void
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
  .connect()
