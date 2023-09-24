import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets'
import { Socket } from 'socket.io'

import { UserService } from './user.service'
import { UserWsEvent } from './enums/user-ws-event'
import { PingUsersStatusRequestDto } from './dto/ping-user-status-request.dto'
import { PingUsersStatusResponseDto } from './dto/ping-user-status-response.dto'

@WebSocketGateway({
  namespace: 'user',
  transports: ['websocket'],
})
export class UserGateway {
  constructor(private readonly userService: UserService) {}

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
    return this.userService.pingUserStatus(dto)
  }
}
