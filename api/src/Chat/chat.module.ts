import { Module } from '@nestjs/common'

import { ChatService } from './chat.service'
import { ChatGateway } from './chat.gateway'
import { MessageGroupModule } from '@/MessageGroup/MessageGroup.module'
import { UserModule } from '@/User/user.module'
import { MessageModule } from '@/Message/message.module'

@Module({
  imports: [MessageGroupModule, UserModule, MessageModule],
  providers: [ChatService, ChatGateway],
  controllers: [],
  exports: [ChatService],
})
export class ChatModule {}
