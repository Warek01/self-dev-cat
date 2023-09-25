import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { FriendRequest } from '@/entities/friend-request.entity'
import { User } from '@/entities/user.entity'

import { FriendRequestController } from './friend-request.controller'
import { FriendRequestService } from './friend-request.service'

@Module({
  imports: [TypeOrmModule.forFeature([FriendRequest, User])],
  controllers: [FriendRequestController],
  providers: [FriendRequestService],
  exports: [],
})
export class FriendRequestModule {}
