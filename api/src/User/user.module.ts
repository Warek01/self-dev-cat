import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { FriendRequest, Log, User } from '@/Entities'
import { UserController } from '@/User/user.controller'
import { UserService } from '@/User/user.service'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, FriendRequest, Log])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
