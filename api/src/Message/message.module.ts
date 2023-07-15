import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { MessageService } from './message.service'
import { MessageController } from './message.controller'
import { Message } from '@/Entities'
import { MessageGroupModule } from '@/MessageGroup/MessageGroup.module'

@Module({
  imports: [TypeOrmModule.forFeature([Message]), MessageGroupModule],
  providers: [MessageService],
  controllers: [MessageController],
  exports: [MessageService],
})
export class MessageModule {}
