import {Global, Module} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { FriendRequest, User } from '@/Entities'
import { FriendRequestController } from './FriendRequest.controller'
import { FriendRequestService } from './FriendRequest.service'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([FriendRequest, User])],
  controllers: [FriendRequestController],
  providers: [FriendRequestService],
  exports: [],
})
export class FriendRequestModule {}
