import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets'

import { UserService } from '@/User/user.service'
import { UserWsEvent } from '@/User/Enums/UserWsEvent'
import { Socket } from 'socket.io'
import {
  PingUsersStatusRequestDto,
  PingUsersStatusResponseDto,
} from '@/User/Dtos'

@WebSocketGateway({
  namespace: 'user',
  transports: ['websocket'],
})
export class UserGateway {
  constructor(private readonly _userService: UserService) {}

  @SubscribeMessage(UserWsEvent.ECHO)
  echo(@MessageBody() data: unknown): WsResponse {
    return {
      event: 'echo',
      data,
    }
  }

  @SubscribeMessage(UserWsEvent.IS_ONLINE)
  setUserOnline(@ConnectedSocket() socket: Socket): Promise<void> {
    return new Promise(() => {})
  }

  @SubscribeMessage(UserWsEvent.IS_OFFLINE)
  setUserOffline(@ConnectedSocket() socket: Socket): Promise<void> {
    return new Promise(() => {})
  }

  @SubscribeMessage(UserWsEvent.PING_ONLINE_STATUS)
  pingUserStatus(
    @MessageBody() dto: PingUsersStatusRequestDto,
  ): WsResponse<PingUsersStatusResponseDto> {
    return this._userService.pingUserStatus(dto)
  }
}
