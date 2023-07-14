import { Injectable } from '@nestjs/common'
import { Socket } from 'socket.io'
import { plainToInstance } from 'class-transformer'
import { WsResponse } from '@nestjs/websockets'

import {
  JoinRoomResponseDto,
  OperationStatusDto,
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
    private readonly _messageGroupService: MessageGroupService,
    private readonly _userService: UserService,
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
  ): Promise<WsResponse<OperationStatusDto>> {
    try {
      const roomId: string = dto.groupId.toString()

      if (!socket.rooms.has(roomId)) {
        await this.joinRoom(socket, dto.groupId, dto.userId)
      }

      const messageDto: MessageDto = await this._messageService.createMessage(
        dto,
      )
      const receiveMessageDto: ReceiveMessageDto = plainToInstance(
        ReceiveMessageDto,
        {
          userId: messageDto.user.id,
          content: messageDto.content,
          timestamp: messageDto.createdAt.toISOString(),
        } as ReceiveMessageDto,
      )
      socket.to(roomId).emit(ChatWsEvent.RECEIVE_MESSAGE, receiveMessageDto)

      return {
        event: ChatWsEvent.SEND_MESSAGE,
        data: {
          success: true,
        },
      }
    } catch (err) {
      return {
        event: ChatWsEvent.SEND_MESSAGE,
        data: {
          success: false,
          error: err instanceof Error ? err.message : err,
        },
      }
    }
  }
}
