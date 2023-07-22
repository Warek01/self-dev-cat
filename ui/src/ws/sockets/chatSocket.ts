import type { Socket } from 'socket.io-client'

import { wsManager } from '../wsManager'
import type { ChatWsEvent } from '../enums/ChatWsEvent'
import type {
  DeleteMessage,
  DeleteMessageRequest,
  JoinRoomRequest,
  JoinRoomResponse,
  SendMessage,
} from '../../types/Chat'
import type { Message } from '../../types/Message'

interface ServerToClientEvents {
  [ChatWsEvent.JOIN_ROOM]: (res: JoinRoomResponse) => void
  [ChatWsEvent.RECEIVE_MESSAGE]: (res: Message) => void
  [ChatWsEvent.DELETE_ALL_MESSAGES]: () => void
  [ChatWsEvent.DELETE_MESSAGE]: (res: DeleteMessage) => void
}

interface ClientToServerEvents {
  [ChatWsEvent.JOIN_ROOM]: (req: JoinRoomRequest) => void
  [ChatWsEvent.SEND_MESSAGE]: (req: SendMessage) => void
  [ChatWsEvent.DELETE_ALL_MESSAGES]: () => void
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
  .connect()
