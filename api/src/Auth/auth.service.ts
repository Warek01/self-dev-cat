import { UserDto } from '@/User/Dtos';
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt'

import type { JwtResponse } from '@/Types/Jwt'
import { UserService } from '@/User/user.service'
import { User } from '@/Entities'
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
  ): Promise<Omit<UserDto, 'password'> | null> {
    const user = await this._userService.findOneByUsername(username)

    if (
      user &&
      (await this._encryptionService.compare(password, user.password))
    ) {
      const { password, ...result } = user
      return result
    }

    return null
  }

  login(user: Omit<User, 'password'>): JwtResponse {
    const payload = { username: user.username, sub: user.id }
    this._logService.auth.login(user as User)

    return {
      access_token: this._jwtService.sign(payload, {
        secret:  this._configService.get('jwt.secret'),
        expiresIn: this._configService.get('jwt.expiresIn'),
      }),
    }
  }
}
