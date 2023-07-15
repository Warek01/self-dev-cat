import type { Socket } from 'socket.io-client'

import { wsManager } from '../wsManager.ts'

interface ServerToClientEvents {}

interface ClientToServerEvents {}

const userSocket: Socket<ServerToClientEvents, ClientToServerEvents> =
  wsManager.socket('/user', {})
