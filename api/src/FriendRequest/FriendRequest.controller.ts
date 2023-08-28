import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'

import { BearerAuthGuard } from '@/Auth/Guard/BearerAuth.guard'
import { FriendRequestService } from './FriendRequest.service'
import { RequestWithUser } from '@/Types/RequestWithUser'
import { GetFriendRequestsResponseDto } from '@/FriendRequest/Dtos'

@ApiTags('Friend requests')
@Controller('friend-request')
export class FriendRequestController {
  constructor(private readonly _friendRequestService: FriendRequestService) {}

  @ApiBearerAuth()
  @Patch('send/:userId')
  @UseGuards(BearerAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async addFriend(
    @Req() req: RequestWithUser,
    @Param('userId', ParseUUIDPipe) toUserId: string,
  ): Promise<void> {
    await this._friendRequestService.addFriend(req.user.userId, toUserId)
  }

  @ApiBearerAuth()
  @Patch('accept/:friendRequestId')
  @UseGuards(BearerAuthGuard)
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async acceptFriendRequest(
    @Req() req: RequestWithUser,
    @Param('friendRequestId', ParseUUIDPipe) friendRequestId: string,
  ): Promise<void> {
    await this._friendRequestService.acceptFriendRequest(
      req.user.userId,
      friendRequestId,
    )
  }

  @ApiBearerAuth()
  @Patch('deny/:friendRequestID')
  @UseGuards(BearerAuthGuard)
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async denyFriendRequest(
    @Req() req: RequestWithUser,
    @Param('friendRequestId', ParseUUIDPipe) friendRequestID: string,
  ): Promise<void> {
    await this._friendRequestService.denyFriendRequest(
      req.user.userId,
      friendRequestID,
    )
  }

  @ApiOperation({ description: 'Get friend requests of current user' })
  @ApiBearerAuth()
  @UseGuards(BearerAuthGuard)
  @Get('user')
  @HttpCode(HttpStatus.OK)
  getFriendRequests(
    @Request() req: RequestWithUser,
  ): Promise<GetFriendRequestsResponseDto> {
    return this._friendRequestService.getFriendRequests(req.user.userId)
  }
}
