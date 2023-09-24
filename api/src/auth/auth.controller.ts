import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { JwtResponse } from '@/types/jwt'
import { CreateUserDto } from '@/user/dto/create-user.dto'

import { LoginDto } from './dto/login.dto'
import { AuthService } from './auth.service'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<JwtResponse> {
    return this.authService.register(createUserDto)
  }

  @Post('login')
  public async login(@Body() loginDto: LoginDto): Promise<JwtResponse> {
    return this.authService.login(loginDto)
  }
}
