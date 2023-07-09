import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets'
import { Socket } from 'socket.io'

import { ChatService } from './chat.service'
import { JoinRoomRequestDto } from './Dtos/JoinRoomRequest.dto'
import { SendMessageDto } from './Dtos/SendMessage.dto'

@WebSocketGateway({
  namespace: 'chat',
  transports: ['websocket'],
})
export class ChatGateway {
  constructor(private readonly _chatService: ChatService) {}

  @SubscribeMessage('echo')
  echo(@MessageBody() data: unknown): WsResponse {
    return {
      event: 'echo',
      data,
    }
  }

  @SubscribeMessage('join room')
  joinRoom(
    @MessageBody() dto: JoinRoomRequestDto,
    @ConnectedSocket() socket: Socket,
  ): void {
    const roomId: string = dto.roomId.toString()
    const message: string  = `${socket.id} joined room ${roomId}`
    const event: string = 'join room'

    socket.join(roomId)
    socket.broadcast.emit(event, message)
    socket.emit(event, message)
  }

  @SubscribeMessage('send message')
  sendMessage(
    @MessageBody() dto: SendMessageDto,
    @ConnectedSocket() socket: Socket,
  ): void {
    const roomId: string = dto.roomId.toString()

    if (socket.rooms.has(roomId)) {
      socket.join(roomId)
    }

    socket.to(dto.roomId.toString()).emit('receive message', dto)
  }
}
