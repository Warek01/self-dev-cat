import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { Socket } from 'socket.io'
import { plainToInstance } from 'class-transformer'
import { WsResponse } from '@nestjs/websockets'

import {
  DeleteAllMessagesDto,
  DeleteMessageDto,
  JoinRoomResponseDto,
  ReceiveMessageDto,
  SendMessageDto,
} from '@/Chat/Dtos'
import { MessageGroupService } from '@/MessageGroup/MessageGroup.service'
import { UserService } from '@/User/user.service'
import { UserDto } from '@/User/Dtos'
import { MessageGroupDto } from '@/MessageGroup/Dtos'
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

  public async joinRoom(
    socket: Socket,
    groupId: number,
    userId: number,
  ): Promise<WsResponse<JoinRoomResponseDto>> {
    try {
      const user: UserDto = await this._userService.getUserOrThrow(userId, {})
      const group: MessageGroupDto =
        await this._messageGroupService.getGroupOrThrow(groupId, {
          users: true,
        })

      if (!group.users.find((groupUser) => groupUser.id === user.id)) {
        throw new Error(
          `user "${user.username}" is not in group "${group.name}"`,
        )
      }

      const res: JoinRoomResponseDto = plainToInstance(JoinRoomResponseDto, {
        userId,
        groupId,
        username: user.username,
        groupName: group.name,
      } as JoinRoomResponseDto)

      socket.join(groupId.toString())
      socket.broadcast.emit(ChatWsEvent.JOIN_ROOM, res)

      return {
        event: ChatWsEvent.JOIN_ROOM,
        data: {
          ...res,
          success: true,
        },
      }
    } catch (err: unknown) {
      return {
        event: ChatWsEvent.JOIN_ROOM,
        data: {
          success: false,
          error: err instanceof Error ? err.message : err,
        },
      }
    }
  }

  async sendMessage(
    dto: SendMessageDto,
    socket: Socket,
  ): Promise<WsResponse<ReceiveMessageDto>> {
    const roomId: string = dto.groupId.toString()

    if (!socket.rooms.has(roomId)) {
      await this.joinRoom(socket, dto.groupId, dto.userId)
    }

    const messageDto: MessageDto = await this._messageService.createMessage(dto)
    const receiveMessageDto: ReceiveMessageDto = plainToInstance(
      ReceiveMessageDto,
      {
        user: {
          id: messageDto.user.id
        },
        content: messageDto.content,
        id: messageDto.id,
        type: messageDto.type,
        createdAt: messageDto.createdAt,
        fileNames: messageDto.fileNames,
        repliesTo: messageDto.repliesTo,
        replies: messageDto.replies,
        updatedAt: messageDto.updatedAt,
      } as ReceiveMessageDto,
    )
    socket.to(roomId).emit(ChatWsEvent.RECEIVE_MESSAGE, messageDto)

    return {
      event: ChatWsEvent.RECEIVE_MESSAGE,
      data: receiveMessageDto,
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

  public deleteAllMessages(dto: DeleteAllMessagesDto, socket: Socket): void {
    this._messageService.deleteAllMessagesFromGroup(dto.groupId)
    socket.to(dto.groupId.toString()).emit(ChatWsEvent.DELETE_ALL_MESSAGES)
  }
}
