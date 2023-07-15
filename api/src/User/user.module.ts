import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { FriendRequest, User } from '@/Entities'
import { UserController } from '@/User/user.controller'
import { UserService } from '@/User/user.service'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, FriendRequest])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
