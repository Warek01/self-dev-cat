import { Module } from '@nestjs/common'

import { MessageGroupModule } from '@/message-group/message-group.module'
import { MessageModule } from '@/message/message.module'

import { ChatService } from './chat.service'
import { ChatGateway } from './chat.gateway'

@Module({
  imports: [MessageGroupModule, MessageModule],
  providers: [ChatService, ChatGateway],
  controllers: [],
  exports: [ChatService],
})
export class ChatModule {}
