import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { JwtResponse } from '@/types/jwt'

import { AuthService } from './auth.service'
import { RegisterDto, LoginDto } from './dto'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() createUserDto: RegisterDto,
  ): Promise<JwtResponse> {
    return this.authService.register(createUserDto)
  }

  @Post('login')
  public async login(@Body() loginDto: LoginDto): Promise<JwtResponse> {
    return this.authService.login(loginDto)
  }
}
