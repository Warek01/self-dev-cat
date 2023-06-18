import { UserDto } from '@/User/Dtos';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt'

import type { JwtResponse } from '@/Types/Jwt'
import { UserService } from '@/User/user.service'
import { EncryptionService } from '@/Encryption/encryption.service'
import { LogService } from '@/Log/log.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _encryptionService: EncryptionService,
    private readonly _jwtService: JwtService,
    private readonly _logService: LogService,
    private readonly _configService: ConfigService
  ) {}

  public async validateUser(
    username: string,
    password: string,
  ): Promise<UserDto | null> {
    const user = await this._userService.findOneByUsername(username)

    if (
      user &&
      (await this._encryptionService.compare(password, user.password))
    ) {
      const { password, ...result } = user
      return result as UserDto
    }

    return null
  }

  async login(username: string): Promise<JwtResponse> {
    const user = await this._userService.findOneByUsername(username)

    if (!user) {
      throw new UnauthorizedException()
    }

    const payload = { username: user.username, sub: user.id }
    await this._logService.auth.login(user)

    return {
      access_token: this._jwtService.sign(payload, {
        secret:  this._configService.get('jwt.secret'),
        expiresIn: this._configService.get('jwt.expiresIn'),
      }),
    }
  }
}
