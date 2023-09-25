import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { MessageGroupModule } from '@/message-group/message-group.module'
import { Message } from '@/entities'

import { MessageService } from './message.service'
import { MessageController } from './message.controller'
import { UserModule } from '@/user/user.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    MessageGroupModule,
    UserModule,
  ],
  providers: [MessageService],
  controllers: [MessageController],
  exports: [MessageService],
})
export class MessageModule {}
