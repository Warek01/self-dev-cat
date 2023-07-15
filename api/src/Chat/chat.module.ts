import { Module } from '@nestjs/common'

import { ChatService } from './chat.service'
import { MessageGroupModule } from '@/MessageGroup/MessageGroup.module'
import { MessageModule } from '@/Message/message.module'
import { ChatGateway } from './chat.gateway'

@Module({
  imports: [MessageGroupModule, MessageModule],
  providers: [ChatService, ChatGateway],
  controllers: [],
  exports: [ChatService],
})
export class ChatModule {}
