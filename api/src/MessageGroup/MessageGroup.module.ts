import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MessageGroupController } from './MessageGroup.controller'
import { MessageGroupService } from './MessageGroup.service'
import { UserModule } from '@/User/user.module'
import { User, MessageGroup } from '@/Entities'

@Module({
  imports: [TypeOrmModule.forFeature([MessageGroup, User]), UserModule],
  providers: [MessageGroupService],
  controllers: [MessageGroupController],
  exports: [MessageGroupService],
})
export class MessageGroupModule {}
