import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  NotFoundException,
  NotImplementedException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { AuthService } from '@/Auth/auth.service'
import { RequestResponse } from '@/Constans'
import { User } from '@/Entities'
import type { JwtResponse } from '@/Types/Jwt'
import type { RequestWithUser } from '@/Types/RequestWithUser'
import {
  CreateUserDto,
  GetFriendsResponseDto,
  UpdateUserDto,
  UserDto,
} from '@/User/Dtos'
import { UserService } from '@/User/user.service'
import { BearerAuthGuard } from '@/Auth/Guard/BearerAuth.guard'

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    @Inject(forwardRef(() => UserService))
    private _userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private _authService: AuthService,
  ) {}

  @ApiOperation({ description: 'Create user' })
  @ApiCreatedResponse()
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  postUser(@Body() createUserDto: CreateUserDto): Promise<JwtResponse> {
    return this._userService.register(createUserDto)
  }

  @ApiBearerAuth()
  @ApiOperation({ description: 'Get user data' })
  @ApiOkResponse({ type: UserDto })
  @Get()
  @UseGuards(BearerAuthGuard)
  @HttpCode(HttpStatus.OK)
  public async getUserData(
    @Req() req: RequestWithUser,
  ): Promise<UserDto | null> {
    try {
      return await this._userService.findOneByUsername(req.user.username)
    } catch {
      throw new NotFoundException()
    }
  }

  @ApiOperation({ description: 'Delete current user' })
  @ApiBearerAuth()
  @ApiOkResponse()
  @Delete()
  @UseGuards(BearerAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Req() req: RequestWithUser): Promise<RequestResponse> {
    await this._userService.delete(req.user.username)
    return RequestResponse.SUCCESS
  }

  @ApiOperation({ description: 'Modify current user' })
  @ApiBearerAuth()
  @ApiOkResponse()
  @UseGuards(BearerAuthGuard)
  @Patch()
  @HttpCode(HttpStatus.OK)
  patchUser(
    @Req() req: RequestWithUser,
    @Body() patchUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return this._userService.updateUser(req.user.username, patchUserDto)
  }

  @ApiBearerAuth()
  @Patch('add-friend')
  @UseGuards(BearerAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async addFriend(
    @Req() req: RequestWithUser,
    @Body() body: { to: string },
  ): Promise<void> {
    await this._userService.addFriend(req.user.username, body.to)
  }

  @ApiBearerAuth()
  @Patch('remove-friend')
  @UseGuards(BearerAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  removeFriend(): Promise<void> {
    throw new NotImplementedException()
  }

  @ApiOperation({ description: 'Login' })
  @ApiOkResponse({ type: String })
  @ApiUnauthorizedResponse()
  @Get('login')
  @HttpCode(HttpStatus.OK)
  login(
    @Query('username') username: string,
    @Query('password') password: string,
  ): Promise<JwtResponse> {
    return this._authService.login(username, password)
  }

  @ApiBearerAuth()
  @UseGuards(BearerAuthGuard)
  @Get(':id/friends')
  @HttpCode(HttpStatus.OK)
  getFriends(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetFriendsResponseDto> {
    return this._userService.getFriends(id)
  }
}
