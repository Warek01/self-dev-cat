import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from '@/entities/user.entity'
import { FriendRequest } from '@/entities/friend-request.entity'

import { UserController } from './user.controller'
import { UserService } from './user.service'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, FriendRequest])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
