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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from '@/auth/jwt.guard'
import type { RequestWithUser } from '@/types/request-with-user'

import { FriendRequestService } from './friend-request.service'
import { GetFriendRequestsResponseDto } from './dto/get-friend-requests-response.dto'
import { GetFriendRequestsRequestDto } from './dto/get-friend-requests-request.dto'
import { ActionResponseDto } from '@/dto/action-response.dto'

@ApiTags('Friend requests')
@Controller('friend-request')
export class FriendRequestController {
  constructor(private readonly friendRequestService: FriendRequestService) {}

  @ApiBearerAuth()
  @Post('send/:userId')
  @UseGuards(JwtAuthGuard)
  addFriend(
    @Req() req: RequestWithUser,
    @Param('userId', ParseUUIDPipe) toUserId: string,
  ): Promise<ActionResponseDto> {
    return this.friendRequestService.addFriend(req.user.id, toUserId)
  }

  @ApiBearerAuth()
  @Patch('accept/:friendRequestId')
  @UseGuards(JwtAuthGuard)
  async acceptFriendRequest(
    @Req() req: RequestWithUser,
    @Param('friendRequestId', ParseUUIDPipe) friendRequestId: string,
  ): Promise<void> {
    await this.friendRequestService.acceptFriendRequest(
      req.user.id,
      friendRequestId,
    )
  }

  @ApiBearerAuth()
  @Patch('deny/:friendRequestId')
  @UseGuards(JwtAuthGuard)
  async denyFriendRequest(
    @Req() req: RequestWithUser,
    @Param('friendRequestId', ParseUUIDPipe) friendRequestId: string,
  ): Promise<void> {
    await this.friendRequestService.denyFriendRequest(
      req.user.id,
      friendRequestId,
    )
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('user')
  getFriendRequests(
    @Request() req: RequestWithUser,
    @Query() query: GetFriendRequestsRequestDto,
  ): Promise<GetFriendRequestsResponseDto> {
    return this.friendRequestService.getFriendRequests(req.user.id, query)
  }
}
