import {
  Controller,
  Get,
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
import {
  GetFriendRequestsRequestDto,
  GetFriendRequestsResponseDto,
} from './dto'
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
  @Patch('accept/:frOrUserId')
  @UseGuards(JwtAuthGuard)
  async acceptFriendRequest(
    @Param('frOrUserId', ParseUUIDPipe) frOrUserId: string,
  ): Promise<void> {
    await this.friendRequestService.acceptFriendRequest(frOrUserId)
  }

  @ApiBearerAuth()
  @Patch('deny/:frOrUserId')
  @UseGuards(JwtAuthGuard)
  async denyFriendRequest(
    @Param('frOrUserId', ParseUUIDPipe) frOrUserId: string,
  ): Promise<void> {
    await this.friendRequestService.denyFriendRequest(frOrUserId)
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
