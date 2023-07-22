import type { Socket } from 'socket.io-client'

import { wsManager } from '../wsManager'

interface ServerToClientEvents {}

interface ClientToServerEvents {}

export const mainSocket: Socket<ServerToClientEvents, ClientToServerEvents> =
  wsManager.socket('/', {})
