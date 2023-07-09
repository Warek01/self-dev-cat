import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Socket } from 'socket.io'

import { RoomMembersOnlineDto } from '@/Chat/Dtos'
import { MessageGroupService } from '@/MessageGroup/MessageGroup.service'
import { UserService } from '@/User/user.service'
import { UserDto } from '@/User/Dtos'
import { MessageGroupDto } from '@/MessageGroup/Dtos'

@Injectable()
export class ChatService {
  constructor(
    private readonly _messageGroupService: MessageGroupService,
    private readonly _userService: UserService,
  ) {}

  private _getOrCreateRoom(id: number): Map<string, number> {

  }

  public async joinRoom(
    socket: Socket,
    roomId: number,
    userId: number,
  ): Promise<void> {
    const user: UserDto = await this._userService.getUserOrThrow(userId)
    const group: MessageGroupDto =
      await this._messageGroupService.getGroupOrThrow(roomId)

    if (!group.users.includes(user)) {
      throw new UnauthorizedException(
        `user ${user.username} is not in group ${group.name}`,
      )
    }

    // this.rooms.
  }

  public async leaveFromRoom() {}

  // public async getRoomOnlineStatus(
  //   roomId: number,
  // ): Promise<RoomMembersOnlineDto> {
  //   const group = await this._messageGroupService.getGroup(roomId)
  //
  //   if (!group) {
  //     throw new WsException(`group ${roomId} does not exist`)
  //   }
  //
  //
  // }
}
