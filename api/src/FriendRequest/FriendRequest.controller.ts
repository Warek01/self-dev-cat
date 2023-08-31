import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { BearerAuthGuard } from '@/Auth/Guard/BearerAuth.guard'
import { FriendRequestService } from './FriendRequest.service'
import { RequestWithUser } from '@/Types/RequestWithUser'
import {
  GetFriendRequestsResponseDto,
  GetFriendsRequestsRequestDto,
} from '@/FriendRequest/Dtos'

@ApiTags('Friend requests')
@Controller('friend-request')
export class FriendRequestController {
  constructor(private readonly _friendRequestService: FriendRequestService) {}

  @ApiBearerAuth()
  @Post('send/:userId')
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
  @Patch('deny/:friendRequestId')
  @UseGuards(BearerAuthGuard)
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async denyFriendRequest(
    @Req() req: RequestWithUser,
    @Param('friendRequestId', ParseUUIDPipe) friendRequestId: string,
  ): Promise<void> {
    await this._friendRequestService.denyFriendRequest(
      req.user.userId,
      friendRequestId,
    )
  }

  @ApiOperation({ description: 'Get friend requests of current user' })
  @ApiBearerAuth()
  @UseGuards(BearerAuthGuard)
  @ApiOkResponse({ type: GetFriendRequestsResponseDto })
  @ApiUnauthorizedResponse()
  @Get('user')
  @HttpCode(HttpStatus.OK)
  getFriendRequests(
    @Request() req: RequestWithUser,
    @Query() query: GetFriendsRequestsRequestDto,
  ): Promise<GetFriendRequestsResponseDto> {
    return this._friendRequestService.getFriendRequests(req.user.userId, query)
  }
}
