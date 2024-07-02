import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  NotImplementedException,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { plainToInstance } from 'class-transformer'

import { RequestResponse } from '@/constans/request-response'
import type { RequestWithUser } from '@/types/request-with-user'
import { JwtAuthGuard } from '@/auth/jwt.guard'
import { User } from '@/entities/user.entity'

import {
  GetUsersRequestDto,
  GetUsersResponseDto,
  UserDto,
  UpdateUserDto,
} from './dto'
import { UserService } from './user.service'

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBearerAuth()
  @Get('get/:userId')
  @UseGuards(JwtAuthGuard)
  public async getUserData(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<UserDto | null> {
    const user: User | null = await this.userService.findById(userId)

    if (!user) {
      throw new NotFoundException()
    }

    return plainToInstance(UserDto, user)
  }

  @ApiBearerAuth()
  @Get('get')
  @UseGuards(JwtAuthGuard)
  public async getUsers(
    @Req() req: RequestWithUser,
    @Query() query: GetUsersRequestDto,
  ): Promise<GetUsersResponseDto> {
    return this.userService.getAll(req.user.id, query)
  }

  @ApiBearerAuth()
  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Req() req: RequestWithUser): Promise<RequestResponse> {
    await this.userService.delete(req.user.username)
    return RequestResponse.SUCCESS
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch()
  patchUser(
    @Req() req: RequestWithUser,
    @Body() dto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.userService.updateUser(req.user.id, dto)
  }

  @ApiBearerAuth()
  @Patch('remove-friend')
  @UseGuards(JwtAuthGuard)
  removeFriend(): Promise<void> {
    throw new NotImplementedException()
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':userId/friends')
  getFriends(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<GetUsersResponseDto> {
    return this.userService.getFriends(userId)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('non-friends')
  getNonFriends(
    @Query() dto: GetUsersRequestDto,
    @Req() req: RequestWithUser,
  ): Promise<GetUsersResponseDto> {
    return this.userService.getNonFriends(dto, req.user.id)
  }
}
