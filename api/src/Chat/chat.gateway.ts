import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets'
import { Socket } from 'socket.io'

import { ChatService } from './chat.service'
import {
  JoinRoomRequestDto,
  JoinRoomResponseDto,
  OperationStatusDto,
  SendMessageDto,
} from './Dtos'
import { ChatWsEvent } from '@/Chat/Enums/ChatWsEvent'

@WebSocketGateway({
  namespace: 'chat',
  transports: ['websocket'],
})
export class ChatGateway {
  constructor(private readonly _chatService: ChatService) {}

  @SubscribeMessage(ChatWsEvent.ECHO)
  echo(@MessageBody() data: unknown): WsResponse {
    return {
      event: 'echo',
      data,
    }
  }

  @SubscribeMessage(ChatWsEvent.JOIN_ROOM)
  joinRoom(
    @MessageBody() dto: JoinRoomRequestDto,
    @ConnectedSocket() socket: Socket,
  ): Promise<WsResponse<JoinRoomResponseDto>> {
    return this._chatService.joinRoom(socket, dto.groupId, dto.userId)
  }

  @SubscribeMessage(ChatWsEvent.SEND_MESSAGE)
  sendMessage(
    @MessageBody() dto: SendMessageDto,
    @ConnectedSocket() socket: Socket,
  ): Promise<WsResponse<OperationStatusDto>> {
    return this._chatService.sendMessage(dto, socket)
  }
}
