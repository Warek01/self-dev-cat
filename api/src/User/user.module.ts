import { Global, Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import { EncryptionService } from '@/Encryption/encryption.service'
import { UserController } from '@/User/user.controller'
import { LogService } from '@/Log/log.service'
import { AuthService } from '@/Auth/auth.service'
import { FriendRequest, Log, User } from '@/Entities'
import { UserService } from '@/User/user.service'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, FriendRequest, Log])],
  providers: [
    UserService,
    EncryptionService,
    LogService,
    AuthService,
    JwtService,
  ],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
