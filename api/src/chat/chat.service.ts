import { Injectable } from '@nestjs/common'
import { Socket } from 'socket.io'
import { WsResponse } from '@nestjs/websockets'

import { MessageService } from '@/message/message.service'
import { MessageDto } from '@/message/dto/message.dto'

import { ChatWsEvent } from './enums/chat-ws-event'
import { SendMessageDto } from './dto/send-message.dto'
import { ReceiveMessageDto } from './dto/receive-message.dto'
import { DeleteMessageDto } from './dto/delete-message.dto'
import { DeleteAllMessagesDto } from './dto/delete-all-messages.dto'

@Injectable()
export class ChatService {
  constructor(private readonly messageService: MessageService) {}

  public async joinRooms(socket: Socket, groupIds: string[]): Promise<void> {
    socket.join(groupIds.map((id) => id.toString()))
  }

  async sendMessage(
    dto: SendMessageDto,
    socket: Socket,
  ): Promise<WsResponse<ReceiveMessageDto>> {
    const roomId: string = dto.groupId.toString()

    if (!socket.rooms.has(roomId)) {
      await this.joinRooms(socket, [dto.groupId])
    }

    const messageDto: MessageDto = await this.messageService.createMessage(dto)

    socket.to(roomId).emit(ChatWsEvent.RECEIVE_MESSAGE, messageDto)

    return {
      event: ChatWsEvent.RECEIVE_MESSAGE,
      data: messageDto,
    }
  }

  public async deleteMessage(
    dto: DeleteMessageDto,
    socket: Socket,
  ): Promise<void> {
    await this.messageService.deleteMessages([
      await this.messageService.getMessageOrThrow(dto.messageId),
    ])
    socket.to(dto.groupId.toString()).emit(ChatWsEvent.DELETE_MESSAGE, {
      messageId: dto.messageId,
    })
  }

  public deleteAllMessages(
    dto: DeleteAllMessagesDto,
    socket: Socket,
  ): WsResponse<DeleteAllMessagesDto> {
    this.messageService.deleteAllMessagesFromGroup(dto.groupId)
    socket.to(dto.groupId.toString()).emit(ChatWsEvent.DELETE_ALL_MESSAGES)

    return {
      event: ChatWsEvent.DELETE_ALL_MESSAGES,
      data: dto,
    }
  }
}
