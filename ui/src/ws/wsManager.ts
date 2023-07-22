import { Manager } from 'socket.io-client'

export const wsManager = new Manager(import.meta.env.VITE_WS_URL, {
  transports: ['websocket'],
})
