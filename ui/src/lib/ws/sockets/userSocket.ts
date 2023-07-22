import type { Socket } from 'socket.io-client'

import { wsManager } from '../wsManager'

interface ServerToClientEvents {}

interface ClientToServerEvents {}

const userSocket: Socket<ServerToClientEvents, ClientToServerEvents> =
  wsManager.socket('/user', {})
