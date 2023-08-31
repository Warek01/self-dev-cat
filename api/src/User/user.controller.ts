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
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { AuthService } from '@/Auth/auth.service'
import { RequestResponse } from '@/Constans'
import type { JwtResponse } from '@/Types/Jwt'
import type { RequestWithUser } from '@/Types/RequestWithUser'
import {
  CreateUserDto,
  GetFriendsResponseDto, GetUsersResponseDto,
  UpdateUserDto,
  UserDto
} from "@/User/Dtos";
import { UserService } from '@/User/user.service'
import { BearerAuthGuard } from '@/Auth/Guard/BearerAuth.guard'
import { GetUsersRequestDto } from "@/User/Dtos/GetUsersRequest.dto";

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
  @ApiOperation({ description: 'Get current user data' })
  @ApiOkResponse({ type: UserDto })
  @Get()
  @UseGuards(BearerAuthGuard)
  @HttpCode(HttpStatus.OK)
  public async getCurrentUserData(
    @Req() req: RequestWithUser,
  ): Promise<UserDto | null> {
    try {
      return await this._userService.findOneByUsername(req.user.username)
    } catch {
      throw new NotFoundException()
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ description: 'Get user data' })
  @ApiOkResponse({ type: UserDto })
  @Get('get/:id')
  @UseGuards(BearerAuthGuard)
  @HttpCode(HttpStatus.OK)
  public async getUserData(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserDto | null> {
    try {
      return await this._userService.findOneById(id)
    } catch {
      throw new NotFoundException()
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ description: 'Get users' })
  @ApiOkResponse({ type: GetUsersResponseDto })
  @Get('get')
  @UseGuards(BearerAuthGuard)
  @HttpCode(HttpStatus.OK)
  public async getUsers(
    @Query() query: GetUsersRequestDto
  ): Promise<GetUsersResponseDto> {
    return this._userService.getAll(query)
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
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<GetFriendsResponseDto> {
    return this._userService.getFriends(id)
  }
}
