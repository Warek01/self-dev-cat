import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets'
import { Socket } from 'socket.io'

import { ChatService } from './chat.service'
import { ChatWsEvent } from './enums/chat-ws-event'
import { JoinRoomRequestDto } from './dto/join-room-request.dto'
import { SendMessageDto } from './dto/send-message.dto'
import { ReceiveMessageDto } from './dto/receive-message.dto'
import { DeleteMessageDto } from './dto/delete-message.dto'
import { DeleteAllMessagesDto } from './dto/delete-all-messages.dto'

@WebSocketGateway({
  namespace: 'chat',
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage(ChatWsEvent.ECHO)
  echo(@MessageBody() data: unknown): WsResponse {
    return {
      event: 'echo',
      data,
    }
  }

  @SubscribeMessage(ChatWsEvent.JOIN_ROOMS)
  joinRoom(
    @MessageBody() dto: JoinRoomRequestDto,
    @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    return this.chatService.joinRooms(socket, dto.groupIds)
  }

  @SubscribeMessage(ChatWsEvent.SEND_MESSAGE)
  sendMessage(
    @MessageBody() dto: SendMessageDto,
    @ConnectedSocket() socket: Socket,
  ): Promise<WsResponse<ReceiveMessageDto>> {
    return this.chatService.sendMessage(dto, socket)
  }

  @SubscribeMessage(ChatWsEvent.DELETE_MESSAGE)
  deleteMessage(
    @MessageBody() dto: DeleteMessageDto,
    @ConnectedSocket() socket: Socket,
  ): void {
    this.chatService.deleteMessage(dto, socket)
  }

  @SubscribeMessage(ChatWsEvent.DELETE_ALL_MESSAGES)
  deleteAllMessages(
    @MessageBody() dto: DeleteAllMessagesDto,
    @ConnectedSocket() socket: Socket,
  ): WsResponse<DeleteAllMessagesDto> {
    return this.chatService.deleteAllMessages(dto, socket)
  }
}
