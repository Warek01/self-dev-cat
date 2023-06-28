import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import { BasicStrategy } from '@/Auth/Strategy/Basic.strategy'
import { BearerStrategy } from '@/Auth/Strategy/Bearer.strategy'
import { AuthService } from './auth.service'
import { EncryptionService } from '@/Encryption/encryption.service'
import { LogService } from '@/Log/log.service'
import { Log } from '@/Entities'

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Log]),
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
    EncryptionService,
    BasicStrategy,
    BearerStrategy,
    JwtService,
    LogService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
