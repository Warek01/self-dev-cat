import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { JwtModule, JwtService } from '@nestjs/jwt'

import { BasicStrategy } from './Strategy/Basic.strategy'
import { BearerStrategy } from './Strategy/Bearer.strategy'
import { AuthService } from './auth.service'

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('jwt.secret'),
        secretOrPrivateKey: configService.get('jwt.secret'),
        signOptions: {
          expiresIn: configService.get('jwt.expiresIn'),
        },
      }),
    }),
  ],
  providers: [
    AuthService,
    BasicStrategy,
    BearerStrategy,
    JwtService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
