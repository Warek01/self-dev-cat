import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MessageGroupController } from './MessageGroup.controller'
import { MessageGroupService } from './MessageGroup.service'
import {MessageGroup, User} from '@/Entities'

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageGroup, User])
  ],
  providers: [MessageGroupService],
  controllers: [MessageGroupController],
  exports: [MessageGroupService],
})
export class MessageGroupModule {}
