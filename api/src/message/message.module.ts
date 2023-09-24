import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { MessageGroupModule } from '@/message-group/message-group.module'
import { Message } from '@/entities/message.entity'

import { MessageService } from './message.service'
import { MessageController } from './message.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Message]), MessageGroupModule],
  providers: [MessageService],
  controllers: [MessageController],
  exports: [MessageService],
})
export class MessageModule {}
