import { BasicAuthGuard } from '@/Auth/Guard/BasicAuth.guard';
import { BearerAuthGuard } from '@/Auth/Guard/BearerAuth.guard';
import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  NotFoundException,
  NotImplementedException,
  Patch,
  Post,
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
import { ChangeUsernameDto, CreateUserDto, UserDto } from '@/User/Dtos'
import { UserService } from '@/User/user.service'

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
  async postUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return await this._userService.create(createUserDto)
  }

  @ApiBearerAuth()
  @ApiOperation({ description: 'Get user data' })
  @ApiOkResponse({ type: UserDto })
  @Get()
  @UseGuards(BearerAuthGuard)
  @HttpCode(HttpStatus.OK)
  // TODO: Create dto for returning data without password or other sensitive information
  public async getUserData(
    @Req() req: RequestWithUser,
  ): Promise<UserDto | null> {
    try {
      return await this._userService.findOneByEmail(req.user.email)
    } catch {
      throw new NotFoundException()
    }
  }

  @ApiOperation({ description: 'Delete current user' })
  @ApiBearerAuth()
  @ApiOkResponse()
  @Delete()
  @UseGuards(BasicAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Req() req: RequestWithUser): Promise<RequestResponse> {
    await this._userService.delete(req.user.email)
    return RequestResponse.SUCCESS
  }

  @ApiOperation({ description: 'Change password' })
  @ApiBearerAuth()
  @ApiOkResponse()
  @Patch('password')
  @UseGuards(BasicAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async changePassword(
    @Req() req: RequestWithUser,
    @Body() body: { password: string },
  ): Promise<RequestResponse> {
    try {
      await this._userService.changePassword(req.user.email, body.password)
      return RequestResponse.APPLIED
    } catch {
      throw new HttpException(
        RequestResponse.NOT_MODIFIED,
        HttpStatus.NOT_MODIFIED,
      )
    }
  }

  @ApiOperation({ description: 'Change real name' })
  @ApiBearerAuth()
  @ApiOkResponse()
  @Patch('real-name')
  @UseGuards(BasicAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async changeRealName(
    @Req() req: RequestWithUser,
    @Body() body: { name: string },
  ): Promise<RequestResponse> {
    try {
      await this._userService.changeRealName(req.user.email, body.name)
      return RequestResponse.APPLIED
    } catch {
      throw new HttpException('Not modified', HttpStatus.NOT_MODIFIED)
    }
  }

  @ApiOperation({ description: 'Change username' })
  @ApiBearerAuth()
  @ApiOkResponse()
  @Patch('username')
  @UseGuards(BasicAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async changeUsername(
    @Req() req: RequestWithUser,
    @Body() body: ChangeUsernameDto,
  ): Promise<RequestResponse> {
    try {
      await this._userService.changeUsername(req.user.email, body.username)
      return RequestResponse.APPLIED
    } catch {
      throw new HttpException('Not modified', HttpStatus.NOT_MODIFIED)
    }
  }

  @ApiBearerAuth()
  @Patch('add-friend')
  @UseGuards(BasicAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async addFriend(
    @Req() req: RequestWithUser,
    @Body() body: { to: string },
  ): Promise<void> {
    await this._userService.addFriend(req.user.username, body.to)
  }

  @ApiBearerAuth()
  @Patch('remove-friend')
  @UseGuards(BasicAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeFriend(): Promise<void> {
    throw new NotImplementedException()
  }

  @ApiOperation({ description: 'Login' })
  @ApiOkResponse({ type: String })
  @ApiUnauthorizedResponse()
  @ApiBasicAuth()
  @Get('login')
  @UseGuards(BasicAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(@Req() req: RequestWithUser): Promise<JwtResponse> {
    return this._authService.login(req.user)
  }
}
