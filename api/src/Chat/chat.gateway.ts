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
  DeleteAllMessagesDto,
  DeleteMessageDto,
  JoinRoomRequestDto,
  JoinRoomResponseDto,
  OperationStatusDto, ReceiveMessageDto,
  SendMessageDto,
} from './Dtos'
import { ChatWsEvent } from '@/Chat/Enums/ChatWsEvent'
import { MessageDto } from "@/Message/Dtos";

@WebSocketGateway({
  namespace: 'chat',
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
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
  ): Promise<WsResponse<ReceiveMessageDto>> {
    return this._chatService.sendMessage(dto, socket)
  }

  @SubscribeMessage(ChatWsEvent.DELETE_MESSAGE)
  deleteMessage(
    @MessageBody() dto: DeleteMessageDto,
    @ConnectedSocket() socket: Socket,
  ): void {
    this._chatService.deleteMessage(dto, socket)
  }

  @SubscribeMessage(ChatWsEvent.DELETE_ALL_MESSAGES)
  deleteAllMessages(
    @MessageBody() dto: DeleteAllMessagesDto,
    @ConnectedSocket() socket: Socket,
  ): void {
    this._chatService.deleteAllMessages(dto, socket)
  }
}
