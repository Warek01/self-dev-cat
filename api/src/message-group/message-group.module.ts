import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from '@/entities/user.entity'
import { MessageGroup } from '@/entities/message-group.entity'
import { UserModule } from '@/user/user.module'

import { MessageGroupController } from './message-group.controller'
import { MessageGroupService } from './message-group.service'

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([MessageGroup, User])],
  providers: [MessageGroupService],
  controllers: [MessageGroupController],
  exports: [MessageGroupService],
})
export class MessageGroupModule {}
