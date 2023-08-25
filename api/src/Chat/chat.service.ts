import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { Socket } from 'socket.io'
import { WsResponse } from '@nestjs/websockets'

import {
  DeleteAllMessagesDto,
  DeleteMessageDto,
  ReceiveMessageDto,
  SendMessageDto,
} from '@/Chat/Dtos'
import { MessageGroupService } from '@/MessageGroup/MessageGroup.service'
import { UserService } from '@/User/user.service'
import { MessageService } from '@/Message/message.service'
import { ChatWsEvent } from '@/Chat/Enums/ChatWsEvent'
import { MessageDto } from '@/Message/Dtos'

@Injectable()
export class ChatService {
  constructor(
    @Inject(forwardRef(() => MessageGroupService))
    private readonly _messageGroupService: MessageGroupService,
    @Inject(forwardRef(() => UserService))
    private readonly _userService: UserService,
    @Inject(forwardRef(() => MessageService))
    private readonly _messageService: MessageService,
  ) {}

  public async joinRooms(socket: Socket, groupIds: string[]): Promise<void> {
    const ids = groupIds.map((id) => id.toString())

    socket.join(ids)
  }

  async sendMessage(
    dto: SendMessageDto,
    socket: Socket,
  ): Promise<WsResponse<ReceiveMessageDto>> {
    const roomId: string = dto.groupId.toString()

    if (!socket.rooms.has(roomId)) {
      await this.joinRooms(socket, [dto.groupId])
    }

    const messageDto: MessageDto = await this._messageService.createMessage(dto)

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
    await this._messageService.deleteMessages([
      await this._messageService.getMessageOrThrow(dto.messageId),
    ])
    socket.to(dto.groupId.toString()).emit(ChatWsEvent.DELETE_MESSAGE, {
      messageId: dto.messageId,
    })
  }

  public deleteAllMessages(
    dto: DeleteAllMessagesDto,
    socket: Socket,
  ): WsResponse<DeleteAllMessagesDto> {
    this._messageService.deleteAllMessagesFromGroup(dto.groupId)
    socket.to(dto.groupId.toString()).emit(ChatWsEvent.DELETE_ALL_MESSAGES)
    return {
      event: ChatWsEvent.DELETE_ALL_MESSAGES,
      data: dto,
    }
  }
}
