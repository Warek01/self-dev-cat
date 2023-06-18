import { UserDto } from '@/User/Dtos'
import { ConfigService } from '@nestjs/config'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { AuthService } from '@/Auth/auth.service'

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _authService: AuthService,
    private readonly _configService: ConfigService,
  ) {
    super({
      secretOrKey: _configService.get('jwt.secret'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    })
  }

  async validate(
    username: string,
    password: string,
  ): Promise<Omit<UserDto, 'password'> | null> {
    const user = await this._authService.validateUser(username, password)

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
